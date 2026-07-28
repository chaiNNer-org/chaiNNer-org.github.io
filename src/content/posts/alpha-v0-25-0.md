---
title: Alpha v0.25.0
date: 2025-10-19
tag: v0.25.0
source: discord
summary: The first stable release in over a year. Two iterators can now be used together, as long as they are the same length.
---

Hey everyone, long time no see. You may have noticed it's been over a year since there's been a new stable version of chaiNNer. Sorry about that, but life got in the way a bit and we ultimately lost our motivation to work on chaiNNer. However, at least for the time being, I am back working on it (just not at full capacity).

There isn't too much to this release, and by now you've probably been using the nightly version for quite a while. Well, there isn't much new compared to that version aside from fixes for the critical bugs you all have found. That being said, there is one major new thing since the last stable version I want to talk about:

## Multiple iterators, sort of

You can now use multiple iterators together! Well, sorta. If two iterators have the same length, i.e. two Load Images nodes each have a different folder with the same number of images, those two iterators can be used together. There's a bit of validation around this, however the UX surrounding this isn't perfect.

Part of the reason this release was so delayed was I wanted to revisit this at some point to attempt to improve the UX. However, that never happened. I don't think it matters much though, because I haven't heard anything negative about it from users of the nightly version.

Note: this does not mean you can combine two iterators in a nested-loop-like fashion. That is still not possible.

## If you have a 5000 series Nvidia GPU

Also, if you previously were having issues with 5000 series Nvidia GPUs, please get this update and update PyTorch in the dependency manager.
