---
title: Alpha v0.13.0
date: 2022-09-29
tag: v0.13.0
summary: GFPGAN face restoration arrives as the Face Upscale node, and the repository moves to the chaiNNer-org organization.
---

Before we begin, you might notice chaiNNer has a new home. The repository now lives in an organization, chaiNNer-org, rather than my personal GitHub account, so the URL is now github.com/chaiNNer-org/chaiNNer. The old one should still redirect, but you should update any links you have — in descriptions, tutorials, and so on — just in case.

## GFPGAN support

This update brings a long-awaited addition: GFPGAN support. Luckily we were able to add this without much hassle. It does not support the original v1 GFPGAN model, though it does support v1.2 and later. That's because GFPGAN v1 requires compiled CUDA extensions, which is not simple to support at this time. The good news is the later models are much better anyway, so you're better off using those to begin with.

GFPGAN support does require installing a new dependency package from the dependency manager, facexlib, as part of the PyTorch package collection. Make sure you do that.

To use it there is a new node, Face Upscale. You pass the loaded model into this node, and can optionally pass in an upscaled version of the background as well. That lets you fully customize the background upscale, unlike the official GFPGAN code, which only lets you upscale with RealESRGAN at a fixed scale.

## About that scale option

Speaking of scale, I added an additional scale option for the GFPGAN output. GFPGAN internally always does an 8x upscale, but the official code and existing GUIs include an output scale option, which just downscales the result. To ease confusion for people expecting it, I implemented it too. Unlike those other implementations, the scale can be any number between 1 and 8 rather than only powers of two.

The important thing to keep in mind is that adjusting the scale does **not** make it process with lower VRAM, or anything like that.

Another important note: the first time you use GFPGAN, facexlib will automatically download some necessary models to `<appdata>/chaiNNer/python/gfpgan`. This only happens on first use, and depending on your internet speed it might take a while. Let it download, and once it's finished everything should work fine.
