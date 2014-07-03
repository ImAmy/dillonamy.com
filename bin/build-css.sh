#!/bin/bash
sassc -m -t compressed ./public/sass/global.scss ./public/css/global.css
autoprefixer -m ./public/css/global.css
