#!/bin/bash

echo "=========================================="
echo "       SYSTEM INFORMATION DASHBOARD       "
echo "=========================================="

echo "1. Hostname    : $(hostname)"
echo "2. Kernel Info : $(uname -r)"
echo "3. System Date : $(date)"
echo "4. Uptime      : $(uptime -p)"
echo "------------------------------------------"
echo "5. Memory Usage:"
free -h
echo "------------------------------------------"
echo "6. Disk Usage (Root):"
df -h /
echo "=========================================="