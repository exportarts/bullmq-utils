# Publishing new releases

> This doc is intended for the core maintainers of the library.

1. Make sure there are no uncommited changes
2. `npm run build && npm test` to verify it works
3. `npm run release` (first try it with `-- --dry-run`)
4. `git push --follow-tags origin master`
5. `npm run build` to release the new version
6. `cd dist && npm publish`
