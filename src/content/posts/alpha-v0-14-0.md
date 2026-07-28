---
title: Alpha v0.14.0
date: 2022-10-27
tag: v0.14.0
summary: Video support rebuilt on a full FFmpeg build, and auto-tiling reworked to use real tile sizes instead of a split factor.
source: discord
---

After a long wait, 0.14.0 is finally here. This update brings a couple of pretty important changes.

## Video support, rebuilt on FFmpeg

One of the biggest changes is improved video support. Many of you have found that the current video support isn't great, as it has limited encoding options which tend to not work depending on the machine. This is due to how OpenCV's video support works — or, I guess, doesn't work — which I won't go into detail about here.

As of this update, video support has been revamped to use a fully featured FFmpeg build. That means many more encoding options than before, so it gives you a lot more flexibility, and it also means it's pretty much guaranteed to work on any system now. A huge improvement, and long overdue.

## Tiling by actual tile size

Another long overdue change is a revamp of how auto-tiling works. For a long time chaiNNer hid tiling options from users and just handled it behind the scenes. If you don't know, tiling is something many upscaling applications implement to get around VRAM limitations, for when an upscale would use more VRAM than your GPU physically has.

We eventually decided to expose manual tiling options, but that still used our internal "split factor" system, which led to the option being called "number of tiles". It was meant to be temporary, stuck around longer than we thought it would, and rightfully confused users.

Thanks to Michael's tiling changes, we now have a similar but much better implementation that uses actual tile sizes. This is much more in line with other upscaling applications and is easier to comprehend and plan around. There are also more options in the dropdown, plus new VRAM estimation for NCNN. You'll see these as "Auto (estimate)" and "Maximum".

Picking "Maximum" works similarly to how it did previously, while "Auto" pre-determines a tile size based on available VRAM. PyTorch has been using this method for a while, and now NCNN has it as well. And of course, with real tile sizes you can use the same one across multiple images without having to change it all the time, if you need to set it manually at all. We still generally recommend Auto or Maximum.
