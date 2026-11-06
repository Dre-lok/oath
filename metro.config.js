const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Windows Metro FallbackWatcher crashes (ENOENT) if it tries to watch a
// directory that disappears mid-session. Temporary export/check trees under
// `.export-check` were triggering that — keep them out of the file map.
config.resolver.blockList = [
  /(^|[\\/])\.export-check([\\/].*)?$/,
];

module.exports = config;
