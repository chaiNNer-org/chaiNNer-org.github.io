/**
 * The shape of a post and the helpers that render one. Deliberately free of the
 * file loading in `loadPosts.ts`, so a page component can import this without
 * pulling every post's markdown into the client bundle.
 */
export interface PostMeta {
    /** URL segment, taken from the filename: `alpha-v0-25-0.md` serves `/blog/alpha-v0-25-0`. */
    slug: string;
    title: string;
    /** ISO date (YYYY-MM-DD). */
    date: string;
    /** One or two sentences. Shown on the index and used as the page description. */
    summary: string;
    /** Release this post announces, linked at the end of it. */
    tag?: string;
    /**
     * Where the post was originally written, when that was not this site. The
     * back catalogue was announced in the Discord years before there was a blog
     * to put it on, and saying so is more honest than dating it here silently.
     */
    source?: PostSource;
}

export const POST_SOURCES = ['discord'] as const;
export type PostSource = (typeof POST_SOURCES)[number];

export const SOURCE_LABEL: Record<PostSource, string> = {
    discord: 'Originally posted in the chaiNNer Discord',
};

/** Short form, for sitting beside a date in a list. */
export const SOURCE_SHORT: Record<PostSource, string> = {
    discord: 'from Discord',
};

export interface Post extends PostMeta {
    /** Markdown, with the frontmatter stripped. */
    body: string;
}

const RELEASES = 'https://github.com/chaiNNer-org/chaiNNer/releases/tag';

export function releaseUrl(tag: string): string {
    return `${RELEASES}/${tag}`;
}

export function formatPostDate(iso: string): string {
    const date = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
