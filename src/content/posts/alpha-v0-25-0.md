---
title: Alpha v0.25.0
date: 2025-10-19
tag: v0.25.0
summary: The first stable release in over a year. Two iterators can now be used together, as long as they are the same length.
source: discord
---

Hey everyone, long time no see. You may have noticed it has been over a year since there was a new stable version of chaiNNer. Sorry about that. Life got in the way a bit, and we ultimately lost our motivation to work on it. For the time being at least, I am back working on chaiNNer, just not at full capacity.

There isn't too much to this release. By now you have probably been using the nightly version for quite a while, and there isn't much new compared to that aside from fixes for the critical bugs you all found. There is one major thing since the last stable version that I want to talk about, though.

## Multiple iterators, sort of

You can now use multiple iterators together. Well, sorta. If two iterators have the same length — two Load Images nodes each pointed at a different folder with the same number of images — those two can be used together. There is some validation around this, but the UX surrounding it isn't perfect.

Part of the reason this release was so delayed is that I wanted to revisit this at some point and try to improve that UX. It never happened. I don't think it matters much, though, because I haven't heard anything negative about it from people using the nightly version.

To be clear: this does not mean you can combine two iterators in a nested-loop fashion. That is still not possible.

## If you have a 5000 series Nvidia GPU

If you were previously having issues with 5000 series Nvidia GPUs, get this update and then update PyTorch in the dependency manager.
