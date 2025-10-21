# 🚀 NASA Project

This is a **backend-focused project** (Node.js, Express, MongoDB) with a pre-built frontend included for testing and demonstration purposes.

The system manages habitable planets and handles mission launches — including scheduling, aborting, and tracking.  
It also integrates with an open-source **SpaceX API** to automatically seed real historical launch data.

---

## 🌍 Overview

The idea behind this project is to simulate a NASA mission scheduling system that interacts with external APIs (SpaceX), processes real data, and manages it through a robust backend.  
It's a pure backend project (with a prebuilt frontend included for testing), designed to practice **REST API design**, **database modeling**, and **data integration** from third-party APIs.

---

## ✨ Features

- **RESTful API** built with Node.js and Express.js  
- **MongoDB Database** using Mongoose ODM  
- **Planets Management**: Detect and store habitable planets  
- **Launches Management**: Schedule, abort, and track launches  
- **Pagination for Launches**: Efficient data loading and browsing of launch records 
- **SpaceX API Integration**: : Automated data seeding from publicly available SpaceX historical launch data using an open-source API (not the official SpaceX API).
- **Data Validation** and input sanitization to ensure clean, consistent data  
- Clear project structure with controllers, services, and models  

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| Backend Framework | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| External API | SpaceX API |
| Validation | express-validator & custom checks |
| Environment Config | dotenv |
| Development Tools | Nodemon, Concurrently |

---

## ⚙️ Project Structure

```
Nasa-Project/
└── client/
|  └── (Provided pre-built code)
│   README.md
│
└───server
    │   
    │   .env.example
    │   kepler_data.csv
    │   package-lock.json
    │   package.json
    │
    ├───data
    │       kepler_data.csv
    │
    ├───public
    └───src
        │   app.js
        │   server.js
        │
        ├───models
        │       launches.model.js
        │       launches.mongo.js
        │       planet.model.js
        │       planets.mongo.js
        │
        ├───routes
        │   │   v1.js
        │   │
        │   ├───launches
        │   │       launches.controller.js
        │   │       launches.router.js
        │   │       launches.test.js
        │   │
        │   └───planets
        │           planets.controller.js
        │           planets.Router.js
        │
        └───services
                mongo.js
                query.js

```

## 🔧 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/NawarSO/Nasa-Project.git
cd Nasa-Project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Environment Variables
Create a `.env` file in the root folder:
```
MONGO_URL=<your_mongodb_connection_string>
PORT=8000
```

### 4. Start the App
Development mode:
```bash
npm run watch
```
Production mode:
```bash
npm run deploy
```

The API will run on:  
👉 **http://localhost:8000/v1**

---

## 🌌 API Endpoints

### 🪐 Planets

| Method | Endpoint | Description |
|--------|-----------|--------------|
| GET | `/planets` | Get all habitable planets |

### 🚀 Launches

| Method | Endpoint | Description |
|--------|-----------|--------------|
| GET | `/launches` | Get all launches |
| POST | `/launches` | Schedule a new launch |
| DELETE | `/launches/:id` | Abort an existing launch |

**Example of scheduling a new launch:**
```json
POST /launches
{
  "mission": "Kepler Exploration X",
  "rocket": "Explorer IS1",
  "destination": "Kepler-442 b",
  "launchDate": "December 12, 2030"
}
```

---

## 🧩 SpaceX Integration

At startup, the app connects to **SpaceX API**, downloads past launch data, and seeds it into the local database.  
This gives a real-world dataset to work with, making the system more dynamic and realistic.  
The seeding logic also avoids duplicates and handles API failures gracefully.

---

## ✅ Data Validation

Every endpoint has input validation and sanitization:
- Prevents malformed requests
- Ensures valid dates for new launches
- Verifies that destinations exist before scheduling
- Returns meaningful error messages with proper HTTP codes

Example error:
```json
{
  "error": "Invalid launch date"
}
```

---

## 📋 Project Context

**Important**: This repository contains both frontend and backend code. 
- **Backend (My Work)**: Complete REST API, database design, SpaceX integration
- **Frontend (Provided)**: Pre-built client interface for testing the API

> “Exploration knows no bounds.” 🌌
