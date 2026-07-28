---
title: Alpha v0.10.0
date: 2022-07-14
tag: v0.10.0
summary: The Navi type system, colored handles that show you what connects to what, a node search context menu, and the ability to disable nodes.
---

This is a pretty exciting update for chaiNNer. The first thing you might notice is all the new colors, but it's a lot more than just a new look, so I'll go over this changelog in a bit more detail than usual.

## A new type system

This update features a major overhaul of types. If you aren't a programmer, or just aren't familiar with types, they're the reason chaiNNer doesn't let you connect an image output to a model input. Models and images are different types, so they aren't compatible.

Previously types were extremely simple. Without getting too technical, a type was just a name — model, or image — and two types were compatible if they had the same name. Now chaiNNer has a brand new type system called Navi, with set-theory-based types. These are much more powerful and enable lots of things that would have been impossible before. Inputs can accept multiple types, and image inputs can require the connected image to have a certain number of channels, like RGB or RGBA. Per-node validation has also been improved, and we can now show you the output size of almost every image output without running anything.

So you might be wondering: "I didn't even know types were a thing before, I just kept trying to connect things and guessing what went where. How exactly does this make anything better for me?"

Well, wonder no more. Each handle now has a dedicated color for each main type. With a quick glance you can see what connects to what — images are yellow, numbers are blue, PyTorch models are orange. Furthermore, as soon as you start dragging a connection out, any incompatible connections turn gray and slightly transparent. You will always know exactly what is connectable and what isn't.

And speaking of connecting things easily.

## The node selector context menu

A highly requested feature: chaiNNer now has a context menu that shows up both when right-clicking blank space in the editor, and when dragging a connection out to blank space. It lets you quickly find a node to place at that position and connect it automatically, in the case of dragging a connection to the canvas. It also filters the node list based on the type of the input or output you dragged from.

It makes setting up chains far easier than before, to the point where someone told me it makes the regular node selection panel obsolete for them. I highly recommend playing around with it, because it really can speed up building a chain.

## Disabling nodes

Another big new feature is the ability to disable nodes. Every node now has a little toggle in the bottom left corner, as well as an entry in the right-click context menu, for disabling and enabling it. A disabled node won't run in the chain, so you can now have floating nodes that aren't connected to anything without worrying about errors. Disabling a node also disables anything connected downstream from it, so it's easy to temporarily turn off part of a large chain.
