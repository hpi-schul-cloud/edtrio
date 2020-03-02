#!/bin/sh -eu

envs=(
    "EDITOR_API_URL"
    "SERVER_API_URL"
    "EDITOR_SOCKET_URL"
    "HOMEWORK_URI"
)

file=$1
if [ -z "${file:-}" ]; then
    echo "missing parameter output file"
    echo "Usage: bash env.sh output/filename.js"
    exit 1
fi

# clear file
> $file

for i in "${envs[@]}"
do
    tmp="$i"
    val="${!tmp}"

    if [ -z "${val:-}" ]; then
        val="undefined"
    else
        val="\"$val\""
    fi

    echo "window.$i = ${val};" >> $file
done

