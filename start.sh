#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
# Function to start the servers
start_servers() {
  # Start Flask server
  cd $SCRIPT_DIR/server
  pip3 install flask
  flask --app server.py run &

  # Wait for Flask server to start
  sleep 2

  # Start Node.js client
  cd ../client
  npm start
}

# Function to stop the servers
stop_servers() {
  # Find and kill the Flask server process
  flask_pid=$(ps aux | grep server.py | grep -v grep | awk '{print $2}')
  if [ -n "$flask_pid" ]; then
    echo "Stopping Flask server (PID $flask_pid)..."
    kill -9 $flask_pid
  fi

  # Find and kill the Node.js client process
  node_pid=$(ps aux | grep "node.*start.js" | grep -v grep | awk '{print $2}')
  if [ -n "$node_pid" ]; then
    echo "Stopping Node.js client (PID $node_pid)..."
    kill -9 $node_pid
  fi
}

# Trap to ensure servers are stopped on script exit
trap stop_servers EXIT

# Start the servers
start_servers