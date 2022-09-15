# Sirice
# This shell script is used to deploy your resume page to github page automatically.

set -e
npm run build
cd dist

git init
git add -A
git commit -m 'deploy'

# change url below to yours.
git push -f https://github.com/yongchin0821/awesome-cron.git main:gh-pages

cd -