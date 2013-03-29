export REPO="$(pwd | sed s,^/home/travis/build/,,g)"
echo -e "Current Repo:$REPO --- Travis Branch:$TRAVIS_BRANCH"

#Set git user
git config --global user.email "wesleyhales@gmail.com"
git config --global user.name "Travis"

#Set upstream remote
git remote add upstream https://${GH_TOKEN}@github.com/wesleyhales/wesleyhales.com.git > /dev/null
git remote add live https://${GH_TOKEN}@github.com/wesleyhales/wesleyhales.github.com > /dev/null

mkdir $HOME/temp_wesleyhales
git clone https://${GH_TOKEN}@github.com/wesleyhales/wesleyhales.github.com $HOME/temp_wesleyhales

cp -rf _site/* $HOME/temp_wesleyhales/

cd $HOME/temp_wesleyhales

git add -f .
git commit -m "add new site content"
git push https://${GH_TOKEN}@github.com/wesleyhales/wesleyhales.github.com master > /dev/null
