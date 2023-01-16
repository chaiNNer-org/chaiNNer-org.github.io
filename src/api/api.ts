import { IGithubRelease } from '../types/githubTypes';

export const getLatestVersion = async (): Promise<IGithubRelease> => {
    const res = await fetch('https://api.github.com/repos/chaiNNer-org/chaiNNer/releases/latest');
    return await res.json();
};

export const getAllVersions = async (): Promise<IGithubRelease[]> => {
    const res = await fetch('https://api.github.com/repos/chaiNNer-org/chaiNNer/releases');
    return await res.json();
};

export const getRepoInfo = async (): Promise<any> => {
    const res = await fetch('https://api.github.com/repos/chaiNNer-org/chaiNNer');
    return await res.json();
};
