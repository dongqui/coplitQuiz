#!/usr/bin/env bash

data=$(git diff --exit-code --cached --name-only --diff-filter=ARC -- 'data/*')
node ./pre-commit.js $data