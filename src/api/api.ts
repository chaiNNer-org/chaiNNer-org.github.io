import fetch from 'cross-fetch';
import { IGithubRelease } from '../types/githubTypes';

const cache = new Map<string, Promise<unknown>>();
async function fetchCached<T>(url: string): Promise<T | undefined> {
    let cached = cache.get(url);
    if (cached === undefined) {
        cached = fetch(url)
            .then(async (res) => (await res.json()) as T | { message?: string })
            .then((json) => {
                if (
                    json != null &&
                    typeof json === 'object' &&
                    'message' in json &&
                    typeof json.message === 'string' &&
                    json.message.includes('API rate limit exceeded')
                ) {
                    return undefined;
                }
                return json;
            });
        cache.set(url, cached);
    }
    return (await cached) as T | undefined;
}

export const getLatestVersion = async (): Promise<IGithubRelease | undefined> => {
    return await fetchCached('https://api.github.com/repos/chaiNNer-org/chaiNNer/releases/latest');
};

export const getAllVersions = async (): Promise<IGithubRelease[] | undefined> => {
    return await fetchCached('https://api.github.com/repos/chaiNNer-org/chaiNNer/releases');
};

export const getRepoInfo = async (): Promise<any | undefined> => {
    return await fetchCached('https://api.github.com/repos/chaiNNer-org/chaiNNer');
};

// Nightly (separate repository)
export const getAllNightlyVersions = async (): Promise<IGithubRelease[] | undefined> => {
    return await fetchCached('https://api.github.com/repos/chaiNNer-org/chaiNNer-nightly/releases');
};

export const getLatestNightly = async (): Promise<IGithubRelease | undefined> => {
    const all = await getAllNightlyVersions();
    if (all == null) return undefined;
    const candidates = all.filter((r) => !r.draft);
    candidates.sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
    return candidates[0];
};
