/**
 * Blog posts, newest first.
 *
 * These four were written as release announcements in the chaiNNer Discord and
 * have been reformatted for the site: headings added, Discord-only bits like
 * inline screenshots and pull-request number lists dropped. The wording is
 * otherwise the original. Dates are the GitHub release dates for each version.
 */
export interface Post {
    /** URL segment, e.g. `alpha-v0-25-0` for `/blog/alpha-v0-25-0`. */
    slug: string;
    title: string;
    /** ISO date (YYYY-MM-DD). */
    date: string;
    /** One or two sentences. Used on the index and as the page description. */
    summary: string;
    /** The release this post announces, linked at the end of the post. */
    tag?: string;
    /** Markdown. */
    body: string;
}

const RELEASES = 'https://github.com/chaiNNer-org/chaiNNer/releases/tag';

export const POSTS: Post[] = [
    {
        slug: 'alpha-v0-25-0',
        title: 'Alpha v0.25.0',
        date: '2025-10-19',
        tag: 'v0.25.0',
        summary: 'The first stable release in over a year. Two iterators can now be used together, as long as they are the same length.',
        body: `
Hey everyone, long time no see. You may have noticed it has been over a year since there was a new stable version of chaiNNer. Sorry about that. Life got in the way a bit, and we ultimately lost our motivation to work on it. For the time being at least, I am back working on chaiNNer, just not at full capacity.

There isn't too much to this release. By now you have probably been using the nightly version for quite a while, and there isn't much new compared to that aside from fixes for the critical bugs you all found. There is one major thing since the last stable version that I want to talk about, though.

## Multiple iterators, sort of

You can now use multiple iterators together. Well, sorta. If two iterators have the same length — two Load Images nodes each pointed at a different folder with the same number of images — those two can be used together. There is some validation around this, but the UX surrounding it isn't perfect.

Part of the reason this release was so delayed is that I wanted to revisit this at some point and try to improve that UX. It never happened. I don't think it matters much, though, because I haven't heard anything negative about it from people using the nightly version.

To be clear: this does not mean you can combine two iterators in a nested-loop fashion. That is still not possible.

## If you have a 5000 series Nvidia GPU

If you were previously having issues with 5000 series Nvidia GPUs, get this update and then update PyTorch in the dependency manager.
`,
    },
    {
        slug: 'alpha-v0-24-0',
        title: 'Alpha v0.24.0',
        date: '2024-06-01',
        tag: 'v0.24.0',
        summary: 'Conditional branching, a skipped state for nodes, selectable themes, and PyTorch upscaling roughly 1.25x faster than before.',
        body: `
Conditional branching, node passthrough and skipping, new themes, PyTorch optimizations, and many more fixes and quality of life improvements all around.

## Branching, mostly

The conditional and compare nodes bring a long-awaited feature: branching support. Well, mostly. These nodes allow you to switch between inputs based on a condition created by comparing two values in various ways. This means you can finally set up chains that do one thing under a certain condition — if an image is over a certain size, say — and another thing under another.

The thing to keep in mind is that how you have to set this up might be the opposite of what's intuitive. Since you're switching between values, it's what comes *before* the condition that is decided on, not what comes after.

## Enabled, disabled, skipped

The disable toggle has been replaced with a button that allows you to swap between three states: enabled, disabled, and skipped. In skipped mode, the node will not be run, but it also will not disable downstream nodes the way disabling it would. This is another heavily requested feature that we are happy is finally in chaiNNer.

## Themes

New themes can be selected in settings. This is semi-experimental, as we plan on adding support for fully custom themes in the future, as well as improving the existing default selection. The current selection is mainly a proof of concept to show that we can support themes of some kind, and to give users some options for customization in the meantime. We'd love to hear feedback on the current selection, and any suggestions for themes to add.

## PyTorch upscaling is faster

PyTorch upscaling has been heavily optimized. I used a visual profiling tool called VizTracer — which I highly recommend for anyone wanting to optimize a Python project — to see what was slowing down upscaling. It has been optimized to the point where it's roughly 1.25x faster than it was before, though your mileage may vary depending on the model you use and other factors. While not perfect, it's still a large improvement, and it should help your PyTorch upscaling chains run faster.
`,
    },
    {
        slug: 'alpha-v0-19-0',
        title: 'Alpha v0.19.0',
        date: '2023-07-31',
        tag: 'v0.19.0',
        summary: 'Searchable documentation for every node, a rewritten update screen, backend setup changes, and the first Rust code in chaiNNer.',
        body: `
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
`,
    },
    {
        slug: 'alpha-v0-16-0',
        title: 'Alpha v0.16.0',
        date: '2022-12-08',
        tag: 'v0.16.0',
        summary:
            'A much more compact node design, inserting a node onto an existing connection, explanations for invalid connections, sharper previews, and DDS support on Windows.',
        body: `
## Major UI improvements

The first thing you might notice in this version is a bit of a redesign. Nodes have been majorly overhauled to be much more compact. It might be a shock how different it looks at first, but I guarantee you'll quickly get used to it and prefer this new look. The compactness gives you much more space to fill out your chains with, and there is a lot less wasted space overall.

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
`,
    },
];

export function findPost(slug: string): Post | undefined {
    return POSTS.find((post) => post.slug === slug);
}

export function releaseUrl(tag: string): string {
    return `${RELEASES}/${tag}`;
}

export function formatPostDate(iso: string): string {
    const date = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
