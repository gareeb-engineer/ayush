#!/bin/bash

cd build-output
pwd
git init
git config user.name "GitHub Actions"
git config user.email "actions@github.com"
git remote add origin https://github.com/gareeb-engineer/ayush.git
touch .nojekyll
git add .
git commit -m "Deploy Antora site"
git branch -M deploy
git push -f origin deploy
