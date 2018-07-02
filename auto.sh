#! /usr/bin/bash

cd /E/Hadoop/pic 

while true
do
  fc="$(ls | wc -l)"
  if [ $fc -gt 0 ];
    then
      FILES=/E/Hadoop/pic/*
      for f in $FILES
      do
       /mingw64/bin/git add $f
       /mingw64/bin/git commit -m "$(date +%H-%M-%S)"
       /mingw64/bin/git remote add https://github.com/dioga51111/run_shell_test.git
       /mingw64/bin/git push -u origin master
       /mingw64/bin/git remote remove orgin
      done
  fi;
  rm -rf /E/Hadoop/pic/* 

  sleep 3

done