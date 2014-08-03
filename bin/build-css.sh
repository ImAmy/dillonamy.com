#!/bin/bash

readonly SASS_PATH=$1
readonly CSS_PATH=$2

find_sass_files() {
    find $SASS_PATH -name [^_]*.scss
}

convert_file_name() {
    local file=$1

    echo $file \
        | sed s@^$SASS_PATH@$CSS_PATH@ \
        | sed s@\.scss$\@\.css@
}

ensure_file_directory() {
    local file=$1
    local directory=${file%/*}

    mkdir -p $directory
}

main() {
    local files=$(find_sass_files)
    local input
    local output

    for input in $files
    do
        output=$(convert_file_name $input)
        ensure_file_directory $output

        echo "Compiling $input -> $output"
        sassc -m -t compressed $input $output
        autoprefixer -m $output
    done
}

main
