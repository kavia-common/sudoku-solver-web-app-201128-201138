#!/bin/bash
cd /home/kavia/workspace/code-generation/sudoku-solver-web-app-201128-201138/sudoku_solver_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

