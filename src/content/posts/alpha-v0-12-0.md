---
title: Alpha v0.12.0
date: 2022-09-04
tag: v0.12.0
summary: Direct PyTorch to NCNN conversion, SwinIR support, faster PyTorch auto-tiling, and lower RAM overhead on large chains.
---

## PyTorch to NCNN conversion

AMD users rejoice: a long-awaited, highly requested feature is finally here. theflyingzamboNNi did a wonderful job converting the original onnx2ncnn C++ code into Python to make this happen.

Under the hood we're converting from PyTorch to ONNX to NCNN, which you can still do yourself if you want to, but we also have direct PyTorch to NCNN conversion for convenience. No more converting to ONNX and using convertmodel.com — it can all be done in chaiNNer. Make sure you have up-to-date NCNN and ONNX packages from the dependency manager for this to work properly.

## SwinIR

The other big thing this release is SwinIR support, for PyTorch. I've wanted to add this architecture for a while and finally got around to it. It's a really good super-resolution architecture with lots of great pretrained models to use.

Ideally we support every variation of SwinIR model, with all the parameters auto-detected, so if any SwinIR model gives you an error please let me know and I'll try to resolve it. One weird thing about SwinIR is that it doesn't support fp16, so that gets automatically disabled when using this architecture, which means no fp16 speed-up. It also can't be converted to NCNN, as NCNN doesn't support all the operations the architecture requires.

Next up for architectures: GFPGAN and HAT. No ETA on those yet.

## Faster auto-tiling, and less RAM

I reworked how PyTorch auto-tiling works. After some experimenting I was able to use the VRAM estimations I added a while back in the logging, with a bit of added safety, instead of the old try/catch splitting method. This yielded a significant performance boost for PyTorch upscaling in general, though only on GPU. CPU upscaling is unaffected.

I've also done a bit to reduce some of the RAM overhead we previously had. Before, we weren't clearing our internal output cache until the entire chain had finished processing, which caused RAM usage to build up significantly on large chains, especially with large images. Now we clear out what is no longer needed, so RAM usage stays as low as possible at all times.
