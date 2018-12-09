#!/usr/bin/env bash

ls
data=$(git diff --exit-code --cached --name-only --diff-filter=ARC -- 'data/*')
node ./hooks/pre-commit.js $data