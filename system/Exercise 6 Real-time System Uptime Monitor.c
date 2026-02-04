#!/bin/bash

echo "Starting Uptime Monitor (Press Ctrl+C to stop)..."
echo "--------------------------------------------------"

while true
do
    # Get current time and uptime
    current_time=$(date +"%H:%M:%S")
    up_time=$(uptime -p)

    echo "[$current_time] System is $up_time"

    # Wait for 5 seconds before next check
    sleep 5
done