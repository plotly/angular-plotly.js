## How to publish on npm

Follow [MAINTENANCE.md](MAINTENANCE.md). Releases are built from a clean
checkout, validated by CI and `npm run verify:package`, published to the
branch-specific `angularN` npm tag with 2FA, and then tagged with a signed
annotated `vN.x.y` Git tag. Only the current Angular major is promoted to
`latest`.
