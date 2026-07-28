---
title: Alpha v0.3.0
date: 2022-03-07
tag: v0.3.0
summary: NCNN support brings upscaling to AMD and Intel GPUs, and every node gets renamed and recategorized around what it does rather than what implements it.
---

It might not seem like it, but this is my biggest update yet, with a few pretty big features and changes.

## NCNN support

The biggest by far is NCNN support. If you don't know what that means, it means far more devices — AMD and Intel GPUs that support Vulkan — will be able to do upscaling. This is huge, and it puts chaiNNer closer to feature parity with other GUIs.

If you're wondering why it took so long, I basically had to figure out myself, with the help of styler00dollar, how to get Vulkan working with the official NCNN Python API, and I ended up having to publish an entirely separate package to PyPI to get it working.

## Nodes named for what they do

The other big change is a complete redesign of how nodes are named and categorized. I decided the existing way was too technical, and that I should make everything a bit more understandable for the end user rather than over-complicating things.

So nodes aren't categorized by "OpenCV" or "NumPy" any more, but by "Image" and "Image (Utility)", and node names are no longer "Image::Read" and "Image::Show" but "Load Image" and "Preview Image". You might also notice each node now has its own icon, instead of every node in a category sharing one.

Under the hood many of these are exactly the same — there's just a new coat of paint on top. And don't worry, old chain files will be automatically converted to the new format.

More is still to come.
