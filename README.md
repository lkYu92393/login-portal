# login-portal

This repo contains of the frontend and the backend server, ideally hosted with docker container.

The frontend uses vite + react.js. It uses nginx for the content hosting and server routing when dockerized.

The backend uses node.js and express as base. When dockerized, it is directly served with node.js.

# frontend

This frontend repo is simply a login portal and a timetable, making use of full calendar library.

The login is handled simply using react context and local storage. When log-in, the app stores the session token and various users variable in local storage. While these storages are used for access right, the backend server also double check the user rights before executing actions.

The architecture is inspired by bulletproof react.

# backend

This back end repo is an express server powered by Node.JS.

It used an architecture of routes + services. It tries to pack the logic in the routes files while keeping the database in and out in services. With this approach, it allows the database to be swapped with minimal changes to logic.
