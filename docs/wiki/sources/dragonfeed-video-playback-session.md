---
title: DragonFeed Video Playback Session
type: source
created: 2026-09-30
updated: 2026-09-30
sources: [2026-09-30-dragonfeed-video-playback.md]
tags: [frontend, feed, video, safari]
---
# DragonFeed Video Playback Session

The mobile investor-demo walkthrough exposed two player lifecycle defects in [[Dragon Feed]]: a metadata-only Safari preview never cleared its loading overlay, and the dialog's parent effect attempted playback before the portal mounted its videos. The original media was valid. The fix requests a preview frame, starts playback from the mounted video component, preserves manual controls, pauses inactive clips, and reports load failures. Seven regression tests cover the behaviors; no content or backend changes were required.
