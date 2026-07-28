---
title: Alpha v0.11.0
date: 2022-08-14
tag: v0.11.0
summary: Image previews inside the editor, via a new View Image node and a rework of how previews and starting nodes work.
source: discord
---

This update took a lot longer than expected, but I think it will be worth the wait.

You can finally preview images inside chaiNNer without having to open an external program. It's not a fully fledged built-in image viewer yet, but rather a node that shows an image preview, similar to how Load Image has always done it.

Part of this feature involved reworking how previews work in general, so you'll see that the previews for both Load Image and PyTorch's Load Model now appear on the outputs of the node rather than the input. That's because we now automatically run valid "starting" nodes — nodes with no ability to create input connections — and use their outputs for setting types and showing previews where applicable. It means more data can be automatically typed and previewed through the type system, so things like file name and directory outputs are now previewed via the type previews.

You'll also notice this happens in iterators. The new View Image node lets you preview the input of an iterator, which was not possible before. And because the other output types are set, you can see other information updating in real time as well, if you use it in the chain.
