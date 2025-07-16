#!/bin/bash
pm2 stop node-app || true
pm2 delete node-app || true