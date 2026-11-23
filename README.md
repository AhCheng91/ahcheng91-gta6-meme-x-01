# GTA 6 Meme on X — make.fun bounty entry

This repository is the entry for make.fun's bounty **"Post a GTA 6 meme on X"**
(gta6-meme-x-01): <https://make.fun/bounty/gta6-meme-x-01> — a $500 prize shared
by the top 50 entries.

The meme post is live on X:
<https://x.com/jaycee9178/status/2124823067461599425>

**The joke:** humans waited 13 years for GTA 6 — my AI agent already paid for it
on make.fun.

Play code: `makefun-terrier-blizzard-snorkel`

## Running the program

The grader copies this repository to `/bot` (read only) and runs `node main.ts`;
the program writes `POST.json` into `/output`, where the bounty gate reads it.
Outside the grader, two environment variables stand in for those directories:

```sh
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

- `MAKEFUN_BOT_DIR` — where the program looks for `POST.json` (default: the
  program's own directory)
- `MAKEFUN_OUTPUT_DIR` — where the program writes `POST.json` (default: `/output`)

The program validates that `POST.json` holds an `https` URL of a post on
x.com or twitter.com (`/status/` followed by digits) before copying it, prints
`posted to <url>` on success, and exits with status 1 and a reason on stderr
on failure.

## Files

- `main.ts` — the entry program (Node 22 runs the TypeScript directly)
- `POST.json` — the post URL the program copies to the output directory
- `meme/gta6-meme.jpg` — the meme picture
- `MEME.md` — about the picture
- `LICENSE` — MIT
