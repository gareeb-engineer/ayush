#!/bin/bash

cd build-output
echo "Current directory: $(pwd)"
git init
git config user.name "GitHub Actions"
git config user.email "actions@github.com"
git remote add origin https://github.com/gareeb-engineer/ayush.git

#adding .nojekyll to prevent Jekyll processing i.e. github should not ignore "_" folder
echo "Adding .nojekyll to prevent Jekyll"
touch .nojekyll
git add .
echo "Files to be committed:"
git commit -m "Deploy Antora site"

#Modify the branch name to 'deploy'
git branch -M deploy

echo "Pushing to remote repository..."
git push -f origin deploy
