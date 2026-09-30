# DragonFeed video playback repair — 2026-09-30

During the investor-demo mobile recording, Ricky Ricardo's nine-second portfolio MOV showed a persistent spinner in iPhone Safari and a paused video without controls in the viewer.

The storage object exists, is publicly readable under the existing profile-assets policy, and contains H.264 video with AAC audio. Desktop decoded the file. No content replacement, profile edit, schema change, or RLS change was needed.

Root causes: FeedPost/FeedTile waited for loadeddata despite requesting only metadata; Safari did not decode a preview frame. FeedViewer started videos in a parent effect, before Radix's portal mounted the video refs. A regression test using the real dialog portal reproduced the missed play call.

Fix: request a short preview seek after metadata and clear the loading overlay. Move playback ownership into FeedViewerVideo, which mounts with its video inside the portal, pauses inactive clips and on cleanup, retains native controls when autoplay is rejected, and shows a media-error message. Space above/below the player keeps controls clear of viewer chrome on both viewports.

Validation: five regression tests cover metadata-only previews for mobile and desktop, portal mounting, active-video changes, rejected autoplay and media errors. Build and TypeScript pass. Safari simulator decoded the preview of the unchanged original video in a focused test. Full suite: 3,934 passed; two pre-existing document checks fail (uncataloged strategy/slogans wiki pages and superseded ARR figures in the strategy briefing). No unrelated document content was changed.
