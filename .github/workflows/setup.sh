#!/bin/bash

cd build-output
echo "Current directory: $(pwd)"
git init
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git remote add origin https://${ secrets.GITHUB_TOKEN }@github.com/${ github.repository }.git

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
