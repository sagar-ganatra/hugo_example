rm -rf public
gulp
hugo
git add -A && git commit -m "updating site on `date`"
git push origin master
git subtree push --prefix public origin gh-pages
