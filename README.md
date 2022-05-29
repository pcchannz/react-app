# Requirement:
- net 6.0 c#
- react 18
- visual studio code

# Project structure
It contains 3 main folders:
- BackendService: which consists of product and cart related apis
- BackendService.Tests: which contains of unit test for above apis
- ClientApp: which is the react app serving product and checkout

# Run
- Easiest is to run with visual studio code by hitting f5.
- With some tuning, it should be able to spawn backend and frontend service together, redirect from port 7119 to 44321 once ready

# Test
- On a separate terminal, cd to ClientApp, run "npm test" that will watch and run unit test

# Deploy 
- Out of scope
