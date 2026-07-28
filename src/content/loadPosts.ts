import { Post, PostMeta } from './post';

/**
 * Every post is a markdown file in `./posts`. Adding one is adding a file — no
 * index to update, no array to keep in order. The filename is the slug, and the
 * frontmatter carries the rest.
 *
 * Frontmatter is deliberately a handful of single-line `key: value` pairs rather
 * than full YAML, so this needs no parser dependency. Anything it does not
 * understand throws, which fails the build rather than quietly dropping a post.
 */
const FILES = import.meta.glob('./posts/*.md', { as: 'raw', eager: true });

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
const FIELD = /^([a-zA-Z][\w-]*):\s*(.*)$/;

const REQUIRED = ['title', 'date', 'summary'] as const;
const OPTIONAL = ['tag'] as const;
const KNOWN = new Set<string>([...REQUIRED, ...OPTIONAL]);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function parse(path: string, raw: string): Post {
    const slug = path.replace(/^.*\//, '').replace(/\.md$/, '');

    const matched = FRONTMATTER.exec(raw);
    if (matched === null) throw new Error(`${path}: expected frontmatter delimited by --- at the top of the file`);
    const [, block, body] = matched;

    const fields = new Map<string, string>();
    for (const line of block.split(/\r?\n/)) {
        if (line.trim() === '') continue;
        const field = FIELD.exec(line);
        if (field === null) throw new Error(`${path}: cannot read frontmatter line "${line}"`);
        const [, key, value] = field;
        if (!KNOWN.has(key)) throw new Error(`${path}: unknown frontmatter key "${key}"`);
        if (fields.has(key)) throw new Error(`${path}: duplicate frontmatter key "${key}"`);
        fields.set(key, value.trim().replace(/^["'](.*)["']$/, '$1'));
    }

    for (const key of REQUIRED) {
        if ((fields.get(key) ?? '') === '') throw new Error(`${path}: frontmatter is missing "${key}"`);
    }

    const date = fields.get('date') ?? '';
    if (!ISO_DATE.test(date)) throw new Error(`${path}: date must be YYYY-MM-DD, got "${date}"`);

    return {
        slug,
        title: fields.get('title') ?? '',
        date,
        summary: fields.get('summary') ?? '',
        tag: fields.get('tag'),
        body: body.trim(),
    };
}

/** Every post, newest first. */
export const POSTS: Post[] = Object.entries(FILES)
    .map(([path, raw]) => parse(path, raw))
    .sort((a, b) => b.date.localeCompare(a.date));

/** Just the metadata, for the index, so post bodies stay out of that page's payload. */
export const POST_META: PostMeta[] = POSTS.map(({ body, ...meta }) => meta);

export function findPost(slug: string): Post | undefined {
    return POSTS.find((post) => post.slug === slug);
}
