---
title: Alpha v0.11.0
date: 2022-08-14
tag: v0.11.0
summary: Image previews inside the editor, via a new View Image node and a rework of how previews and starting nodes work.
source: discord
---

In-editor image previews & more.

This update took a lot longer than expected, but I think it will be worth the wait.

## Previewing images without leaving chaiNNer

You can finally preview images inside chaiNNer without having to open an external program! It's not a fully-fledged built-in image viewer (yet), but rather a node that will show an image preview similar to how Load Image has always done it. Part of this feature included reworking how previews work in general, so you'll see that the previews for both Load Image and PyTorch's Load Model now appear on the outputs of the node rather than the input. This is due to the fact that we now automatically run valid "starting" nodes (nodes with no ability to create input connections) and use their outputs for setting types and showing previews (if applicable). This means we now allow more data to be automatically typed and previewed through the type system as well, meaning things like file name and directory outputs now are previewed via the type previews.

## Previews inside iterators

You'll also notice this happens in iterators. The new View Image node allows you to preview the input of iterators, something which was not possible before. And, due to the other outputs types being set, you can see in real-time other information being updated (if you use it in the chain).
