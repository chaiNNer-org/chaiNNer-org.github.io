---
title: Alpha v0.5.0
date: 2022-04-05
tag: v0.5.0
summary: Batch upscaling arrives, through a new kind of node called an iterator, along with DDS and TGA support via Pillow.
source: discord
---

Batch Upscaling is finally here!

This is chaiNNer's biggest update yet with this long overdue, highly requested feature being the center of attention.

## Iterators

Batch upscaling is performed using an "Image File Iterator" node. Iterators are a new type of node in chaiNNer that allow you to run the nodes inside the iterator on multiple items. Right now, the only iterator is the "Image File Iterator" which takes a folder input and runs the sub-nodes on each image file in the folder (and its sub-folders). This means you can finally perform batch upscaling in chaiNNer! They can be a bit tricky to get used to, so if you have any questions about how to use them, don't hesitate to ask in the Discord server.

## More file types

Along with Iterators, DDS, TGA, and many more filetypes are now supported when you install the Pillow dependency in the dependency manager. You still cannot save images as these filetypes at the moment, but at least this should help when upscaling game textures. This was another highly requested feature that I am happy to finally have in chaiNNer.

For Iterators especially, please let me know as soon as possible if you run into any issues with them, and I will try to get those issues fixed as soon as I can.
