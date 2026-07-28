---
title: Alpha v0.19.0
date: 2023-07-31
tag: v0.19.0
source: discord
summary: Searchable documentation for every node, a rewritten update screen, backend setup changes, and the first Rust code in chaiNNer.
---

Hey everyone. It's been a while since the last update, and in my opinion, it's been worth the wait. We have a lot of interesting improvements and new features to share with all of you.

## Documentation for every node

We now have documentation for all available nodes. This can be accessed both by a button in the top right button bar, as well as by right-clicking on a node in the sidebar and clicking "Open Documentation". The documentation includes a lot of information about nodes and their inputs & outputs. Not to mention, the docs are also searchable. This will hopefully be a huge help to both new and existing users.

## A new update screen

The update screen has finally received a makeover. This has been a long-overdue change. Starting with 0.19.0, you will get a popup when there is a new update, which will have an option for ignoring the update or viewing the update's changelog. If you view the changelog, a modal will open that will show you a full changelog of the update — or multiple updates if you happen to be a few versions behind. From there you can view the release on GitHub or open chaiNNer.app to download it. If you do choose to ignore the update, don't worry, because you will see a green download indicator next to chaiNNer's version number which you can click on to view the update again.

## Backend setup changes

We've made some improvements to how the backend sets up chaiNNer. This is mostly to prep for future features, but it also conveniently makes it slightly easier to set up chaiNNer on a remote machine, as all the necessary dependencies will be installed via the backend, instead of the frontend. This shouldn't affect existing users much, except you may notice that on starting up chaiNNer this time you see a slightly different progress indication on the splash screen as it installs the few new necessary dependencies. We also now bundle a couple of small, cross-platform dependencies that should make first-time setup a bit faster. If anyone is having trouble with the new first-time setup process, definitely let us know ASAP.

## Some of chaiNNer is now Rust

chaiNNer is now taking advantage of some first-party Rust code. This means we were able to speed up certain nodes by a significant amount. Expect future updates to improve the speed of other nodes as we move some intensive operations over to Rust.
