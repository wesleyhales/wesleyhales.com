export REPO="$(pwd | sed s,^/home/travis/builds/,,g)"
ssh -o StrictHostKeyChecking=no
if [ "$TRAVIS_BRANCH" == "travis" ]; then
    git branch -D gh-pages
    git checkout -B gh-pages
    git add -f reports/.
    git commit -m "Add loadreport.js output"
    git push https://$(GH_TOKEN)@github.com/${REPO} gh-pages > /dev/null
fi