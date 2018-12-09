#!/usr/bin/env bash

cd .git/hooks
touch pre-commit
touch pre-push
ln -s -f ../../hooks/pre-commit.sh ./pre-commit
ln -s -f ../../hooks/pre-push.sh ./pre-push