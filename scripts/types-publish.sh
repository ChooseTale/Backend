#!/bin/sh

echo 'nestia sdk를 생성하고 organization에 배포'

read -p "(y/n): " choice

if [ "$choice" = "n" ]; then
    echo "실행하지 않음"
else
    cd scripts

    source .env.script

    cd ..

    npx nestia sdk

    cd libs/types

    npm version patch

    npm publish

    echo "배포 완료!"

    curl -X POST -H 'Content-type: application/json' --data '{"text": "package updated!"}' $SLACK_GITHUB_NOTIFICATION_CHANNEL_KEY

fi
