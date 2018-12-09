#!/usr/bin/env bash

cd .git/hooks
touch pre-commit
touch pre-push
cd ../..
ln -s -f ../../hooks .git/hooks