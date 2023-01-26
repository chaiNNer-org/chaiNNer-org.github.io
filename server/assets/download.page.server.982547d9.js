const getLatestVersion = async () => {
  const res = await fetch("https://api.github.com/repos/chaiNNer-org/chaiNNer/releases/latest");
  return await res.json();
};
const getAllVersions = async () => {
  const res = await fetch("https://api.github.com/repos/chaiNNer-org/chaiNNer/releases");
  return await res.json();
};
async function onBeforeRender(pageContext) {
  const data = await getLatestVersion();
  const dmgBuild = data == null ? void 0 : data.assets.find((asset) => asset.name.endsWith(".dmg"));
  const exeBuild = data == null ? void 0 : data.assets.find((asset) => asset.name.endsWith(".exe"));
  const debBuild = data == null ? void 0 : data.assets.find((asset) => asset.name.endsWith(".deb"));
  const rpmBuild = data == null ? void 0 : data.assets.find((asset) => asset.name.endsWith(".rpm"));
  const zipBuilds = data == null ? void 0 : data.assets.filter((asset) => asset.name.endsWith(".zip"));
  const winZip = zipBuilds == null ? void 0 : zipBuilds.find((asset) => asset.name.includes("win"));
  const macZip = zipBuilds == null ? void 0 : zipBuilds.find((asset) => asset.name.includes("mac"));
  const linuxZip = zipBuilds == null ? void 0 : zipBuilds.find((asset) => asset.name.includes("linux"));
  const allVersions = await getAllVersions();
  const computedChangelog = allVersions.reduce((acc, curr) => {
    return `${acc}
# ${curr.name}
${curr.body}`;
  }, "");
  const pageProps = { dmgBuild, exeBuild, debBuild, rpmBuild, winZip, macZip, linuxZip, computedChangelog, latestVersion: data };
  return {
    pageContext: {
      pageProps
    }
  };
}
export {
  onBeforeRender
};
