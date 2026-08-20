# Maintenance and release policy

The package major identifies its supported Angular major. `master` tracks the
latest Angular major; older supported majors use `vN` maintenance branches.

| Package line | Angular | Branch | npm tag | Status |
| --- | --- | --- | --- | --- |
| 20.x | 20.x | `v20` | `angular20` | LTS through 2026-11-28 |
| 21.x | 21.x | `v21` | `angular21` | LTS |
| 22.x | 22.x | `master` | `angular22`, `latest` | Active |

## Changes and forward ports

Fix an issue on the oldest affected maintained branch. Forward-port the merged
commit in ascending major order with `git cherry-pick -x`, one linked pull
request per branch. Do not forward-port Angular migrations, dependency-major
changes, package versions, or release metadata.

`master` has no duplicate current-major branch. Before upgrading `master` to a new
Angular major, create `vN` from its final commit and protect that branch.

## Releases

1. Open a release pull request that updates both package manifests and the
   changelog.
2. Merge only after the required CI check passes on the release commit.
3. In a clean checkout, run `npm ci`, `npm run lint`, `npm test`,
   `npm run build`, `npm audit --omit=dev --audit-level=high`, and
   `npm run verify:package`, and `npm run verify:consumer`.
4. Publish `dist/plotly` with npm 2FA to the branch's `angularN` tag.
5. Install and inspect the published version. Promote it to `latest` only when
   it is the current Angular major, then verify all expected npm dist-tags.
6. Create a signed annotated `vN.x.y` tag on the release commit, push it, and
   create a GitHub Release from the changelog entry.

Never publish a maintenance branch directly to `latest`. Patch releases contain
fixes and security updates; minor releases add backward-compatible features;
major releases select a new Angular compatibility line.
