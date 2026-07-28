---
title: Alpha v0.3.0
date: 2022-03-07
tag: v0.3.0
summary: NCNN support brings upscaling to AMD and Intel GPUs, and every node gets renamed and recategorized around what it does rather than what implements it.
source: discord
---

There's two really big features in this build: NCNN support and a node redesign.

It might not seem like it, but this is my biggest update yet with a few pretty big features and changes.

## NCNN support

The biggest by far is NCNN support. If you don't know what that means, it just means that far more devices (AMD and Intel GPUs that support Vulkan) will be able to do upscaling. This is huge and puts chaiNNer closer to feature parity with other GUIs. If you're wondering why this took so long, I basically had to figure out myself (with the help of styler00dollar) how to get Vulkan working with the official NCNN Python api, and I ended up having to publish an entirely separate package to PyPi to get it working.

## A node redesign

The other big change in this release is a complete redesign of how nodes are named and categorized. I decided that the existing way was too technical and that I should make everything a bit more understandable for the end-user, rather than over-complicating things. So for example, nodes aren't categorized by "OpenCV" or "NumPy" anymore, but rather "Image" and "Image (Utility)", and node names are no longer "Image::Read" and "Image::Show" but rather "Load Image" and "Preview Image". You also might notice each node also now has an icon associated with it instead of each category all being the same icon. Under the hood, many of these are exactly the same, there's just a new coat of paint on top. And don't worry, old chain files (.chn) will be automatically converted to this new format.

More is still to come.
