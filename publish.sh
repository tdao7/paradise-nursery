#!/usr/bin/env bash
set -euo pipefail

REPO="tdao7/paradise-nursery"
command -v gh >/dev/null || { echo 'GitHub CLI is required: https://cli.github.com/'; exit 1; }
command -v git >/dev/null || { echo 'Git is required.'; exit 1; }
LOGIN="$(gh api user --jq .login)"
if [[ "$LOGIN" != "tdao7" ]]; then
  echo "Authenticated GitHub account is '$LOGIN', expected 'tdao7'. Aborting."
  exit 1
fi
if [[ ! -d .git ]]; then
  git init -b main
fi
CURRENT_BRANCH="$(git branch --show-current)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  git branch -M main
fi
git add .
if ! git diff --cached --quiet; then
  git -c user.name=tdao7 -c user.email=18365806+tdao7@users.noreply.github.com commit -m "Add Paradise Nursery React shopping app"
fi
if gh repo view "$REPO" >/dev/null 2>&1; then
  VISIBILITY="$(gh repo view "$REPO" --json visibility --jq .visibility)"
  if [[ "$VISIBILITY" != "PUBLIC" ]]; then
    echo "The existing repository '$REPO' is not public. Aborting to protect existing private data."
    exit 1
  fi
  if git remote get-url origin >/dev/null 2>&1; then
    git remote set-url origin "https://github.com/$REPO.git"
  else
    git remote add origin "https://github.com/$REPO.git"
  fi
  git push -u origin main
else
  gh repo create "$REPO" --public --source=. --remote=origin --push
fi
printf '\nSuccess: https://github.com/%s\n' "$REPO"
