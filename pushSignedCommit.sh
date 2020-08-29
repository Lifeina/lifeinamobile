#!/bin/sh

# yarn run ps:format

if [ -z "$1" ]
  then
    git add -A; git commit -S -m ":heart: $(curl -s whatthecommit.com/index.txt) :heart_eyes:"; git push
else
    git add -A; git commit -S -m "$1"; git push
fi
