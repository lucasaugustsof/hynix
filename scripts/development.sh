#!/bin/bash

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null
then
    echo "pnpm is not installed. Please install it before running this script."
    exit 1
fi

# Function to execute a command and clean pnpm cache
execute_with_cache_clean() {
    local cmd="$1"
    echo "Executing command: $cmd"

    eval "$cmd"
    if [ $? -eq 0 ]; then
        echo "Command executed successfully."
    else
        echo "Error executing command: $cmd"
    fi

    echo "Cleaning pnpm cache..."
    pnpm store prune
    if [ $? -eq 0 ]; then
        echo "pnpm cache cleaned successfully."
    else
        echo "Error cleaning pnpm cache."
    fi
}

# Commands to be executed
COMMAND1="turbo dev"

# Execute the commands
execute_with_cache_clean "$COMMAND1"
