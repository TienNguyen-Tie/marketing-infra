---
description: Run pre-deploy checklist for the project
---

Run the pre-deploy checklist for this project. Verify each item and report status with ✅ / ⚠️ / ❌:

1. Run `npx tsc --noEmit` and check for type errors
2. Run `npm run build` and confirm it succeeds (this may take 1-2 minutes — be patient)
3. Read `LAST_BUILD.md` and check whether it documents the latest changes from this session
4. Check that any new env vars are documented in `LAST_BUILD.md`
5. Run `npx prisma migrate status` to check that the migration history is in sync with the database
6. Grep for `console.log(` in `app/` and `components/` folders — flag any introduced this session (compare against git history if needed)
7. Grep for `TODO:` or `FIXME:` in changed files — list any new ones

For each item:

- ✅ if passing
- ⚠️ if non-blocking concern
- ❌ if failing (must fix before deploy)

End with one clear statement: "Ready to deploy" or "Fix these N issues before deploy: [list]"
