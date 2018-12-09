#!/usr/bin/env bash

data=$(git diff --exit-code --cached --name-only --diff-filter=AR -- 'data/*')
node ./hooks/pre-commit.js $data