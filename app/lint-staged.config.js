module.exports = {
  linters: {
    '**/*.+(js|json|less|css|ts|tsx|md)': [
      'prettier --write',
      'yarn test:staged',
      'git add',
    ],
  },
}
