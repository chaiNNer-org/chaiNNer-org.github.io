---
title: Alpha v0.13.0
date: 2022-09-29
tag: v0.13.0
summary: GFPGAN face restoration arrives as the Face Upscale node, and the repository moves to the chaiNNer-org organization.
source: discord
---

GFPGAN support is finally here!

Before we begin, you might notice chaiNNer has a new home! This repository now lives in an organization (chaiNNer-org) rather than my personal GitHub account. This means that the URL to the repository is now https://github.com/chaiNNer-org/chaiNNer. The old one should still redirect here though, but you should update any links you have (in descriptions, tutorials, etc) just in case.

## GFPGAN support

This update brings a long-awaited addition: GFPGAN support! Luckily, we were able to add this without much hassle. However, it does not support the first v1 GFPGAN model (but it does support v1.2+). This is because GFPGAN v1 requires compiled CUDA extensions, which is not simple to support at this time. The good news is, the later models are much better anyway, so you are better off using those to begin with. GFPGAN support does require installing a new dependency package from the dependency manager, facexlib (as part of the PyTorch package collection), so make sure you do that!

To use GFPGAN with chaiNNer, there is now a new node: Face Upscale. You pass the loaded model into this node, and can optionally pass in an upscaled version of the background as well. This allows you to fully customize the background upscale, unlike the official GFPGAN code which only allows you to upscale with RealESRGAN at a fixed scale.

## About that scale option

Speaking of scale, I did add an additional scale option for the GFPGAN output. While GFPGAN internally always does an 8x upscale, the official code as well as existing GUIs have included an output scale option (which just downscales the result). To ease confusion from people expecting this, I just decided to implement this as well. Unlike these other implementations though, the scale can be any number between 1 and 8, instead of just powers of 2. The important thing to keep in mind here is that adjusting the scale DOES NOT make it actually process with lower VRAM or anything like that.

Another important note: The first time you use GFPGAN, facexlib will automatically download some necessary models to `<appdata>/chaiNNer/python/gfpgan`. This only happens for the first use, and depending on your internet speed might take a while. Just let it download and once finished everything should work fine.
