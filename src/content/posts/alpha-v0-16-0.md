---
title: Alpha v0.16.0
date: 2022-12-08
tag: v0.16.0
summary: A much more compact node design, inserting a node onto an existing connection, explanations for invalid connections, sharper previews, and DDS support on Windows.
---

## Major UI improvements

The first thing you might notice in this version is a bit of a redesign. Nodes have been majorly overhauled to be much more compact. It might be a shock how different it looks at first, but I guarantee you'll quickly get used to it and prefer this new look. The compactness gives you much more space to fill out your chains with, and there is a lot less wasted space overall.

```compare
{
  "before": "/images/blog/v0-16-0-nodes-before.jpg",
  "after": "/images/blog/v0-16-0-nodes-after.jpg",
  "beforeLabel": "Before",
  "afterLabel": "After",
  "width": 1161,
  "height": 816,
  "alt": "The same chain before and after the redesign."
}
```

With that change also came a change to sliders. In my opinion they are now a lot easier to see and interact with, and closer to something you'd see in Blender.

There have also been changes to pop-up boxes. Settings had a bit of an overhaul to fix some scrolling issues, and all pop-ups now have a darker color. Alerts also got icons representing the type of alert.

## Node-on-connection insertion

Something we all have always wanted in chaiNNer was the ability to insert a compatible node in between two connected nodes, without having to delete the connection and make two new ones. That's now a reality. Hold alt while dragging a node in the editor, and both the node and the connection line will show you visually that the node can be connected this way. It's really convenient, and it can save a lot of time.

## Telling you why a connection is invalid

The UI will now tell you when a connection you're trying to make is invalid. Before, we would tell you why a node was invalid after it was already connected and made invalid, but we had never explained why some connections were not possible to begin with. This confused a lot of users, who would try to do things like connect a GFPGAN model to Upscale Image and think something was wrong, rather than it being intentional. The UI wouldn't let them make that connection, but it wouldn't say why either.

This update adds an explanation tooltip when you attempt to drop a connection on a handle it can't go to. That should improve the experience and lead to less confusion.

## Higher resolution View Image previews

View Image just became a lot more useful. Instead of a 512x512 preview of your image, you'll now see up to 2K resolution when zoomed all the way in. This still isn't ideal for images larger than 2K where you need to zoom in further than chaiNNer allows, but a feature for that is coming in the future. For now it's a huge improvement, and it makes inline previewing much better. We also improved the performance of the node, so previews may load faster than they used to.

## Better DDS support, on Windows

Previously unsupported DDS texture files can now be read and written on Windows. We make use of Texconv, a small texture utility that we now bundle with chaiNNer. Unfortunately Texconv is Windows-only, which means Linux and macOS users won't be able to take advantage of this, but we figured it was still better to have it than not.
