#!/bin/bash

search="AOC 2023"
replace="AOC 2015"

for folder in */; do
    dir_name=$(basename "${folder}")
    target="${dir_name}/${dir_name}.test.ts"

    if [ -f "$target" ]; then
        if grep -q "$search" "$target"; then
            sed -i "s/$search/$replace/g" "$target"
            echo "Replaced in $target"
        else
            echo "String not found in $target"
        fi
    fi
done