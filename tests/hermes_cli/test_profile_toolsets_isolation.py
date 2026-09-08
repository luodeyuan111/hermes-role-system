"""R2.1: per-profile toolset trimming isolation tests.

Each Hermes profile is a fully independent HERMES_HOME with its own
``config.yaml`` (see ``hermes_cli/profiles.py``). These tests simulate two
profiles (``scholar`` and ``coder``) as separate HERMES_HOME directories and
prove that toolset trimming written into one profile's ``config.yaml`` takes
effect for that profile only, leaving the other profile untouched.

Both supported trimming surfaces are exercised:

- ``agent.disabled_toolsets`` — profile-global suppression applied last by
  ``_get_platform_tools`` (overrides platform defaults and explicit lists).
- ``platform_toolsets.<platform>`` — explicit per-platform toolset list saved
  in the profile's own config.yaml.
"""

import yaml

from hermes_cli.config import load_config
from hermes_cli.tools_config import _get_platform_tools


def _write_profile_config(profile_dir, config: dict) -> None:
    profile_dir.mkdir(parents=True, exist_ok=True)
    with open(profile_dir / "config.yaml", "w", encoding="utf-8") as f:
        yaml.safe_dump(config, f)


def _enabled_toolsets_for_profile(monkeypatch, profile_dir, platform: str = "cli"):
    """Load the profile's config.yaml exactly as a session under that
    profile's HERMES_HOME would, then resolve enabled toolsets."""
    monkeypatch.setenv("HERMES_HOME", str(profile_dir))
    config = load_config()
    return _get_platform_tools(config, platform)


def test_profile_disabled_toolsets_are_isolated(tmp_path, monkeypatch):
    """scholar disables ``browser``, coder disables ``image_gen`` — each via
    its own config.yaml's ``agent.disabled_toolsets``. Neither leaks into the
    other profile."""
    scholar_dir = tmp_path / "profiles" / "scholar"
    coder_dir = tmp_path / "profiles" / "coder"
    _write_profile_config(scholar_dir, {"agent": {"disabled_toolsets": ["browser"]}})
    _write_profile_config(coder_dir, {"agent": {"disabled_toolsets": ["image_gen"]}})

    scholar_enabled = _enabled_toolsets_for_profile(monkeypatch, scholar_dir)
    coder_enabled = _enabled_toolsets_for_profile(monkeypatch, coder_dir)

    # scholar: browser off, image_gen still on
    assert "browser" not in scholar_enabled
    assert "image_gen" in scholar_enabled

    # coder: image_gen off, browser still on
    assert "image_gen" not in coder_enabled
    assert "browser" in coder_enabled


def test_profile_explicit_platform_toolsets_are_isolated(tmp_path, monkeypatch):
    """An explicit ``platform_toolsets.cli`` list in one profile's config
    does not affect another profile that keeps the platform default."""
    scholar_dir = tmp_path / "profiles" / "scholar"
    coder_dir = tmp_path / "profiles" / "coder"
    # scholar saves an explicit cli list WITHOUT browser.
    _write_profile_config(
        scholar_dir,
        {"platform_toolsets": {"cli": ["terminal", "file", "web", "memory", "skills"]}},
    )
    # coder has no toolset config at all — pure platform default.
    _write_profile_config(coder_dir, {})

    scholar_enabled = _enabled_toolsets_for_profile(monkeypatch, scholar_dir)
    coder_enabled = _enabled_toolsets_for_profile(monkeypatch, coder_dir)

    assert "browser" not in scholar_enabled
    assert "terminal" in scholar_enabled
    assert "file" in scholar_enabled

    # coder falls back to the hermes-cli default composite, browser included.
    assert "browser" in coder_enabled
    assert "terminal" in coder_enabled


def test_profile_without_toolset_config_gets_platform_default(tmp_path, monkeypatch):
    """Documents the current fallback semantics: a profile whose config.yaml
    does not mention toolsets resolves to the *platform default composite*
    (hermes-cli), NOT to an intersection with any other profile's (or the
    default profile's) trimming. Profiles are independent HERMES_HOMEs —
    there is no cross-profile config inheritance to intersect with."""
    fresh_dir = tmp_path / "profiles" / "fresh"
    _write_profile_config(fresh_dir, {})

    enabled = _enabled_toolsets_for_profile(monkeypatch, fresh_dir)

    # Default-on toolsets from the hermes-cli composite are present...
    assert "browser" in enabled
    assert "image_gen" in enabled
    assert "terminal" in enabled
    # ...and default-off toolsets stay off.
    assert "spotify" not in enabled
    assert "video_gen" not in enabled


def test_profile_trimming_composes_with_platform_restrictions(tmp_path, monkeypatch):
    """Platform-level gating and profile-level trimming compose: a profile
    cannot enable a platform-restricted toolset (``discord`` on cli) even by
    listing it explicitly, and default-off toolsets stay off unless the
    profile explicitly opts in."""
    prof_dir = tmp_path / "profiles" / "scholar"
    _write_profile_config(
        prof_dir,
        {"platform_toolsets": {"cli": ["terminal", "discord", "spotify"]}},
    )

    enabled = _enabled_toolsets_for_profile(monkeypatch, prof_dir)

    assert "terminal" in enabled
    # discord toolset is platform-restricted to discord — off on cli.
    assert "discord" not in enabled
    # Explicitly listed plugin toolset opts in even though default-off.
    assert "spotify" in enabled
