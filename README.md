# login-portal

This repo contains of the frontend and the backend server, ideally hosted with docker container.

The frontend uses vite + react.js. It uses nginx for the content hosting and server routing when dockerized.

The backend uses node.js and express as base. When dockerized, it is directly served with node.js.

# frontend

This frontend repo is initialed with Vite + Javascript.
The frontend is a simple web portal with a timetable function, using the full calendar library.

The login is handled simply using react context and local storage. When log-in, the app stores the session token and various users variable in local storage. While these storages are used for access right, the backend server also double check the user rights before executing actions.

The architecture is inspired by bulletproof react.

# backend

The backend part is initialized using express generator.
The stack is an express server powered by NodeJS.

It used an architecture of routes + services. In the first layer, it simply expose the service. In the deeper layers, depending on the database/logic, different source codes can be used so to minimize the impact when switching to other database/source.

It also used webpack for better organization. Webpack is a tool usually used in frontend project because it can minimized file size and make code harder to read and increase the diffculty to be read. But it can also be used in backend. It provides the function to define an alias so import can be done using absolute path instead of relative path. The problem with relative path is that it is difficult to restructure the file after the first commit. 

# How to run

cd to both folders and run `npm install`. If you don't have webpack installed globally, you will also need to run `npm install -g webpack-cli`.

## local test

After installtion, cd to frontend and run `npm run dev`. This will start the frontend.
Cd to backend and run `webpack build`. Then `node ./dist/bundle.js` to start the backend.
