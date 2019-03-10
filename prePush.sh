prePrettierstatus="$(git status --porcelain)";

FILES=$(git diff develop --name-only --diff-filter=ACM "*.js" "*.jsx" "*.json" | sed 's| |\\ |g')
[ -z "$FILES" ] && exit 0

echo "$FILES" | xargs ./node_modules/.bin/prettier --write

prettierStatus="$(git status --porcelain)";
if [[ $prePrettierstatus ==  $prettierStatus ]]; then
  exit 0
fi
exit 'There is file has been prettier'
