const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString().trim();
const repoUrl = 'https://github.com/prplecake/fetchLocation';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  env: {
    COMMIT_HASH: commitHash,
    REPO_URL: repoUrl,
  }
}

module.exports = nextConfig;