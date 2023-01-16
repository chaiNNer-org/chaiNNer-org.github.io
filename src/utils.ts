import UAParser from 'ua-parser-js';

const parser = new UAParser();
export const OS = parser.getOS();

export const isWindows = OS.name === 'Windows';
export const isMac = OS.name === 'Mac OS';
export const isLinux = OS.name === 'Linux';

export const isDebian = OS.name === 'Debian';
export const isRedHat = OS.name === 'RedHat';

export const isSupportedOS = isWindows || isMac || isLinux || isDebian || isRedHat;

export const fileExtensionMap = {
    Windows: 'exe',
    'Mac OS': 'dmg',
    Debian: 'deb',
    RedHat: 'rpm',
    Linux: 'zip',
};
