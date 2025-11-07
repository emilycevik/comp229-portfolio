# COMP229 Portfolio Backend

## Project Overview
This project implements a full backend API for a personal portfolio web application using **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

## Features
- MongoDB Atlas connection via Mongoose
- RESTful CRUD operations for:
  - Projects
  - Contacts
  - Qualifications (Educations)
  - Users (with authentication)
- JWT-based login and protected routes
- Tested with Thunder Client / Postman

## Endpoints
| Resource | Endpoint | Methods |
|-----------|-----------|----------|
| Projects | /api/projects | GET, POST, PUT, DELETE |
| Contacts | /api/contacts | GET, POST, PUT, DELETE |
| Qualifications | /api/qualifications | GET, POST, PUT, DELETE |
| Users | /api/users | POST (register/login), GET (profile) |

## Running the Server
1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
