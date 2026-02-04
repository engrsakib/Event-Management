#!/bin/bash

show_menu() {
    echo "-----------------------------------"
    echo "    SNMP Learning Tool (Menu)      "
    echo "-----------------------------------"
    echo "1. What is SNMP?"
    echo "2. Show Installation Command"
    echo "3. Simulate SNMP Walk"
    echo "4. Exit"
    echo "-----------------------------------"
}

while true
do
    show_menu
    read -p "Enter your choice [1-4]: " choice
    echo ""

    case $choice in
        1)
            echo ">> INFO: SNMP (Simple Network Management Protocol) is used"
            echo "   for monitoring and managing devices on a network."
            ;;
        2)
            echo ">> COMMAND: To install SNMP on Linux, use:"
            echo "   sudo apt-get update && sudo apt-get install snmp snmpd"
            ;;
        3)
            echo ">> SIMULATION: Running snmpwalk..."
            echo "   SNMPv2-MIB::sysDescr.0 = STRING: Linux lab-report 6.17.8"
            echo "   SNMPv2-MIB::sysObjectID.0 = OID: NET-SNMP-MIB::netSnmpAgentOIDs.10"
            echo "   SNMPv2-MIB::sysUpTime.0 = Timeticks: (12345) 0:02:03.45"
            ;;
        4)
            echo "Exiting Tool. Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid option! Please try again."
            ;;
    esac
    echo ""
    sleep 1
done