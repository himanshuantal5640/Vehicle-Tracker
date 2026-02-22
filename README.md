 FleetPulse – Real-Time Fleet Tracking System

FleetPulse is a full-stack real-time fleet tracking and trip management system built using React, Node.js, MongoDB, and WebSockets.

This project simulates real-time GPS vehicle movement and enables booking, starting, tracking, and completing trips dynamically.



Features:- 

   1 Real-time vehicle tracking using WebSockets

    2 Trip booking with source & destination

    3 Automatic vehicle assignment

    4 Route visualization on map (Leaflet)

    5 Live movement simulation

    6 Trip lifecycle management (Planned → In Progress → Completed)

    7 Speed-based alert system

    8 Auto vehicle availability management

How It Works:- 

Vehicles are simulated on backend using a GPS engine.

Backend updates vehicle position every second.

WebSocket broadcasts updates to frontend.

Frontend updates map instantly.

Starting a trip attaches a route to the vehicle.

Vehicle follows route point-by-point.

Trip auto-completes when destination is reached.

Tech Stack:--

Frontend:

React (Vite)

Tailwind CSS

Zustand (State Management)

Leaflet Maps

Backend:

Node.js

Express

MongoDB

WebSocket (ws)

Deployment:

Vercel (Frontend)

Render (Backend)

MongoDB Atlas


Architecture:--

Frontend (React)
↓ WebSocket + REST API
Backend (Node.js + Express)
↓
MongoDB Atlas
 
Challenges Solved:--

Avoided parallel document save conflicts in Mongoose

Designed real-time event-driven vehicle simulation

Integrated trip lifecycle with route-based movement

Ensured WebSocket synchronization across clients

Future Improvements :--

ETA calculation

Real OSRM routing integration

Authentication & role management

Driver mobile interface

Scalable microservices architecture