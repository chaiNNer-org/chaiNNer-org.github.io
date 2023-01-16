// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getLatestVersion = async () => {
    const res = await fetch('https://api.github.com/repos/chaiNNer-org/chaiNNer/releases/latest');
    console.log('🚀 ~ file: api.ts:4 ~ getLatestVersion ~ res', res);
    return await res.json();
};
