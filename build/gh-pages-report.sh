export REPO="$(pwd | sed s,^/home/travis/build/,,g)"
echo -e "Current Repo:$REPO --- Travis Branch:$TRAVIS_BRANCH"

#Set git user
git config --global user.email "wesleyhales@gmail.com"
git config --global user.name "Travis"

#Set upstream remote
git remote add upstream https://${GH_TOKEN}@github.com/wesleyhales/wesleyhales.com.git > /dev/null

git fetch -qn upstream > /dev/null

if [ "$TRAVIS_BRANCH" == "master" ]; then
    git checkout gh-pages
    phantomjs loadreport.js http://www.wesleyhales.com performance json
    git add -f reports/.
    git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to gh-pages"
    git push https://${GH_TOKEN}@github.com/${REPO} gh-pages > /dev/null
fi