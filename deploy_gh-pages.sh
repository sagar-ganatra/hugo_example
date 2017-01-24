remote=$(git config remote.origin.url)

rm -rf public
gulp
hugo

git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1
git init
git remote add --fetch origin "$remote"
git pull origin master

git add -A && git commit -m "updating site on `date`"
git push origin master
git subtree push --prefix public origin gh-pages
