/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PageContextServer } from '../../types';
import { AUTHORS, Post } from '../../content/post';
import { findPost, POSTS } from '../../content/loadPosts';

const SITE = 'https://chainner.app';

/** Marks the page as an article by a person on a date, rather than another copy of the app listing. */
function blogPosting(post: Post): Record<string, unknown> {
    const author = AUTHORS[post.author];
    const url = `${SITE}/blog/${post.slug}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        datePublished: post.date,
        dateModified: post.date,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        image: `${SITE}/banner.png`,
        author: {
            '@type': 'Person',
            name: author.name,
            url: author.url,
        },
        publisher: {
            '@type': 'Organization',
            name: 'chaiNNer',
            url: SITE,
        },
        isPartOf: {
            '@type': 'Blog',
            '@id': `${SITE}/blog`,
            name: 'chaiNNer Blog',
        },
    };
}

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
                image: `${SITE}/banner.png`,
                jsonLd: blogPosting(post),
            },
        },
    };
}

/** Tells the pre-renderer which post URLs exist, since the route is dynamic. */
function prerender() {
    return POSTS.map((post) => `/blog/${post.slug}`);
}

export { onBeforeRender, prerender };
