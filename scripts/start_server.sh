#!/bin/bash
cd /home/ec2-user/node-app
# Khởi động bằng PM2
#pm2 start index.js --name node-app
nohup node index.js > output.log 2>&1 &
