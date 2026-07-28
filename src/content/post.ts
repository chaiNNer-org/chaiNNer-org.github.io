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
    /** What sort of post this is. Defaults to `release` when the frontmatter omits it. */
    kind: PostKind;
    /** Who wrote it. Defaults to `joey` when the frontmatter omits it. */
    author: AuthorId;
    /** Release this post announces, linked at the end of it. Releases only. */
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

/**
 * `release` announces a version and links its GitHub release. `announcement` is
 * everything else worth saying, tied to no version.
 */
export const POST_KINDS = ['release', 'announcement'] as const;
export type PostKind = (typeof POST_KINDS)[number];

export const KIND_LABEL: Record<PostKind, string> = {
    release: '',
    announcement: 'Announcement',
};

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

export interface Author {
    name: string;
    /** Avatar, served from this repo rather than hotlinked, so it cannot go stale. */
    avatar: string;
    url: string;
}

/**
 * Who writes here. Keyed by the `author` in a post's frontmatter, which defaults
 * to `joey` — the only writer so far, but a second one is a line in this map
 * rather than a change to the byline.
 */
export const AUTHORS = {
    joey: {
        name: 'Joey',
        avatar: '/images/joey.png',
        url: 'https://github.com/joeyballentine',
    },
} as const satisfies Record<string, Author>;

export type AuthorId = keyof typeof AUTHORS;
export const AUTHOR_IDS = Object.keys(AUTHORS) as AuthorId[];
export const DEFAULT_AUTHOR: AuthorId = 'joey';

const RELEASES = 'https://github.com/chaiNNer-org/chaiNNer/releases/tag';

export function releaseUrl(tag: string): string {
    return `${RELEASES}/${tag}`;
}

export function formatPostDate(iso: string): string {
    const date = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return iso;
    return date.toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
