---
title: Alpha v0.24.0
date: 2024-06-01
tag: v0.24.0
source: discord
summary: Conditional branching, a skipped state for nodes, selectable themes, and PyTorch upscaling roughly 1.25x faster than before.
---

Conditional branching, node passthrough/skipping, new themes, PyTorch optimizations, and many more fixes and quality of life improvements all around.

## Branching, mostly

The conditional and compare nodes bring a long-awaited feature: branching support. Well, mostly. These nodes allow you to switch between inputs based on a condition created by comparing two values in various ways. This means users can finally set up chains that do one thing under a certain condition (e.g. if an image is over a certain size) and another thing under another. The thing to keep in mind is how you have to set this up might be opposite of what's intuitive. Since you're switching between values, it's what comes before the condition that is decided on, not what comes after.

## Enabled, disabled, skipped

The disable toggle has also been replaced with a button that allows you to swap between three states: "enabled", "disabled", and "skipped". In skipped mode, the node will not be run, but it also will not disable downstream nodes like disabling it would. This is another heavily-requested feature that we are happy is finally in chaiNNer.

## Themes

New themes can be selected in settings. This is semi-experimental as we plan on adding support for fully custom themes in the future, as well as improving the existing default selection. The current selection is mainly just a proof of concept to show that we can support themes of some kind, and also to give users some options for customization. We'd love to hear feedback on the current selection and if you have any suggestions on themes to add.

## PyTorch upscaling is faster

PyTorch upscaling has been heavily optimized. I was able to use a visual profiling tool (called VizTracer, which I highly recommend for anyone wanting to optimize a python project) to see what was slowing down upscaling. Upscaling has been optimized to a point where it's roughly 1.25x faster than it was before (though YMMV depending on what model you use, as well as other factors). While not perfect, it's still a large improvement and should help your PyTorch upscaling chains run faster.
