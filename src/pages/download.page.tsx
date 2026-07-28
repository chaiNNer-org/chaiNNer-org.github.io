/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '../index.scss';
import { ReleasePage } from '../components/ReleasePage';
import { PlatformBuild, ReleaseNote } from '../utils/releases';

interface DownloadPageProps {
    versionLabel: string | undefined;
    versionDate: string | undefined;
    builds: PlatformBuild[];
    notes: ReleaseNote[];
}

function Page({ versionLabel, versionDate, builds, notes }: DownloadPageProps) {
    return (
        <ReleasePage
            builds={builds}
            notes={notes}
            versionDate={versionDate}
            versionLabel={versionLabel}
            archiveHref="https://github.com/chaiNNer-org/chaiNNer/releases"
            archiveLabel="Every release on GitHub"
            crossLink={{ label: 'Nightly builds', href: '/nightly' }}
            intro="The current stable build. chaiNNer sets up its own Python environment the first time you open it, so there is nothing to install beforehand."
            notesHeading="Release notes"
            title="Download"
        />
    );
}

export { Page };

export const documentProps = {
    title: 'Download chaiNNer - Free Image Processing Software',
    description:
        'Download the latest stable version of chaiNNer for Windows, macOS, and Linux. Free, open-source node-based image processing software with batch processing and GPU acceleration.',
    keywords: 'download chaiNNer, free image processing software, node editor download, Windows macOS Linux, batch image processing',
    image: 'https://chainner.app/banner.png',
};
