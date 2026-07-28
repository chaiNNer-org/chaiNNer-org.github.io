/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PageContextServer } from '../types';
import { AUTHORS } from '../content/post';
import { POST_META } from '../content/loadPosts';

const SITE = 'https://chainner.app';

/** The index only needs titles and dates, so post bodies never reach this page. */
async function onBeforeRender(pageContext: PageContextServer) {
    return {
        pageContext: {
            pageProps: { posts: POST_META },
            documentProps: {
                title: 'chaiNNer Blog - Release Notes and Project Updates',
                description:
                    'Posts about chaiNNer releases, features, and how the node-based image processing editor works. Written by the maintainers of the project.',
                keywords: 'chaiNNer blog, chaiNNer updates, image processing news, node editor releases',
                image: `${SITE}/banner.png`,
                // Names the collection and what is in it, so the posts read as a
                // blog rather than as unrelated pages that happen to share a path.
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@type': 'Blog',
                    '@id': `${SITE}/blog`,
                    name: 'chaiNNer Blog',
                    url: `${SITE}/blog`,
                    publisher: { '@type': 'Organization', name: 'chaiNNer', url: SITE },
                    blogPost: POST_META.map((post) => ({
                        '@type': 'BlogPosting',
                        headline: post.title,
                        description: post.summary,
                        datePublished: post.date,
                        url: `${SITE}/blog/${post.slug}`,
                        author: { '@type': 'Person', name: AUTHORS[post.author].name, url: AUTHORS[post.author].url },
                    })),
                },
            },
        },
    };
}

export { onBeforeRender };
