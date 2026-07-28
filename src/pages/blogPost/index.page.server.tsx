/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PageContextServer } from '../../types';
import { findPost, POSTS } from '../../content/posts';

async function onBeforeRender(pageContext: PageContextServer) {
    const slug = (pageContext.routeParams as { slug?: string } | undefined)?.slug;
    const post = slug == null ? undefined : findPost(slug);

    // Only the slugs prerender() lists are ever built, so this cannot happen at
    // runtime. Failing the build is the right answer if the two ever disagree;
    // a URL outside that set is served the static 404 by the host.
    if (post === undefined) throw new Error(`No blog post with slug "${slug ?? ''}"`);

    return {
        pageContext: {
            pageProps: { post },
            // Per-post metadata, since a static documentProps export cannot vary by URL.
            documentProps: {
                title: `${post.title} - chaiNNer`,
                description: post.summary,
                keywords: `chaiNNer ${post.title}, chaiNNer release notes, image processing, node editor`,
                image: 'https://chainner.app/banner.png',
            },
        },
    };
}

/** Tells the pre-renderer which post URLs exist, since the route is dynamic. */
function prerender() {
    return POSTS.map((post) => `/blog/${post.slug}`);
}

export { onBeforeRender, prerender };
