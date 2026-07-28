---
title: Alpha v0.19.0
date: 2023-07-31
tag: v0.19.0
summary: Searchable documentation for every node, a rewritten update screen, backend setup changes, and the first Rust code in chaiNNer.
source: discord
---

Hey everyone. It's been a while since the last update, and in my opinion it's been worth the wait. We have a lot of interesting improvements and new features to share with all of you.

## Documentation for every node

We now have documentation for all available nodes. It can be reached from a button in the top right button bar, or by right-clicking a node in the sidebar and choosing "Open Documentation". The documentation includes a lot of information about nodes and their inputs and outputs, and it's searchable. This should be a big help to both new and existing users.

## A new update screen

The update screen has finally received a makeover, which has been long overdue. Starting with 0.19.0, you get a popup when there is a new update, with the option to ignore it or view its changelog. Viewing the changelog opens a modal with the full changelog for the update — or for several updates, if you happen to be a few versions behind. From there you can view the release on GitHub or open chainner.app to download it. If you do ignore an update, don't worry: a green download indicator appears next to chaiNNer's version number, and clicking it brings the update back.

## Backend setup changes

We've made some improvements to how the backend sets chaiNNer up. This is mostly to prepare for future features, but it also conveniently makes it a little easier to set chaiNNer up on a remote machine, since all the necessary dependencies get installed by the backend instead of the frontend.

This shouldn't affect existing users much, except that on starting up this time you may see a slightly different progress indication on the splash screen while it installs the few new dependencies. We also now bundle a couple of small cross-platform dependencies that should make first-time setup a bit faster. If anyone has trouble with the new first-time setup process, definitely let us know as soon as possible.

## Some of chaiNNer is now Rust

chaiNNer is now taking advantage of some first-party Rust code, which let us speed up certain nodes by a significant amount. Expect future updates to improve the speed of other nodes as we move more intensive operations over to Rust.
