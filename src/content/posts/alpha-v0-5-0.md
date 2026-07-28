---
title: Alpha v0.5.0
date: 2022-04-05
tag: v0.5.0
summary: Batch upscaling arrives, through a new kind of node called an iterator, along with DDS and TGA support via Pillow.
source: discord
---

This is chaiNNer's biggest update yet, with this long overdue, highly requested feature being the centre of attention.

Batch upscaling is performed using an Image File Iterator node. Iterators are a new type of node in chaiNNer that let you run the nodes inside them on multiple items. Right now the only one is the Image File Iterator, which takes a folder as input and runs the sub-nodes on each image file in that folder and its sub-folders. That means you can finally do batch upscaling in chaiNNer.

They can be a bit tricky to get used to, so if you have any questions about how to use them, don't hesitate to ask in the Discord server.

Along with iterators, DDS, TGA, and many more file types are now supported once you install the Pillow dependency in the dependency manager. You still can't save images as these file types at the moment, but at least it should help when upscaling game textures. Another highly requested feature I'm happy to finally have in chaiNNer.

For iterators especially, please let me know as soon as possible if you run into any issues, and I'll try to get them fixed as soon as I can.
