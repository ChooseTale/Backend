#!/bin/sh
yarn prisma migrate deploy
node dist/src/main.js