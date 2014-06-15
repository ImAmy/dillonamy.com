#!/bin/bash
if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
        export PATH=/usr/local/bin:$PATH
        NODE_ENV=staging forever start --uid "staging" --minUptime 10000 --spinSleepTime 10000 -a -w --sourceDir /home/amy/dillonamy.com ./bin/www > /dev/null
        NODE_ENV=production forever start --uid "production" --minUptime 10000 --spinSleepTime 10000 -a -w --sourceDir /var/www/dillonamy.com ./bin/www > /dev/null
fi
