#!/bin/bashbash

#Check if a folder name is provided
if [ -z "$1" ]; then
    echo No folder name given
    exit 1
fi

# Use the provided folder name
folder_name="$1"

# Create the folder
mkdir "$folder_name"

# Change into the folder
cd "$folder_name"

# Create some sample files
touch $1.test.ts
touch $1.ts 
touch example_a.txt
touch example_b.txt
touch input.txt

echo "Folder '$folder_name' and files created successfully."