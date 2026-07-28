---
title: Alpha v0.12.0
date: 2022-09-04
tag: v0.12.0
summary: Direct PyTorch to NCNN conversion, SwinIR support, faster PyTorch auto-tiling, and lower RAM overhead on large chains.
source: discord
---

PyTorch to NCNN conversion is here! And so is SwinIR support, and much much more!

## PyTorch to NCNN conversion

AMD users rejoice: a long-awaited, highly requested feature is finally here: PyTorch to NCNN conversion! theflyingzamboNNi did a wonderful job converting the original onnx2ncnn C++ code into python code in order to make this happen. Under the hood, we're converting from PyTorch to ONNX to NCNN (which you can still do if you want to), but we also have direct PyTorch to NCNN conversion for convenience. This means no more needing to convert to ONNX and use convertmodel.com! It can all be done in chaiNNer. Note: Make sure you have up-to-date NCNN and ONNX packages from the dependency manager in order for this to work properly.

## SwinIR support

The other big thing this release is SwinIR support (for PyTorch). I've wanted to add this architecture for a while and I finally got around to it. It is a really good Super Resolution architecture with lots of great pretrained models to use. Ideally, we support every variation of SwinIR model (with all the params auto-detected), but if any of the SwinIR models give you an error please let me know and I'll try to resolve it. One weird thing about SwinIR is that it actually doesn't support fp16, so that will be automatically disabled when using this arch (so that means no fp16 speed-up). It also doesn't support conversion to NCNN, as NCNN does not support all the operations required for the architecture. Next-up architecture additions: GFPGAN and HAT (no ETA on these yet though).

## Faster auto-tiling, and less RAM

I've also reworked how the PyTorch auto-tiling works. After some experimenting, I was able to use the VRAM estimations I added a while back in the logging (with a bit of added safety) instead of the old try/catch splitting method. This yielded a significant performance boost for PyTorch upscaling in general, though only when upscaling with GPU. CPU upscaling is unaffected by this change.

I've also done a bit to reduce some of the RAM overhead we previously had. Before, we weren't clearing out our internal output cache until after the entire chain was finished processing. This caused RAM usage to build up significantly for large chains, especially with large images. Now, we clear out things we no longer need so that RAM usage stays as low as possible at all times.
