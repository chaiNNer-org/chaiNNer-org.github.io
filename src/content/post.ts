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
}

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
