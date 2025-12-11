# Customer Onboarding MVP

## Project Overview
This project is a full-stack MVP designed to onboard customs brokers. It includes a user registration flow that captures
details (Name, Email, GSTIN), securely hashes passwords using bcrypt, and persists data to a PostgreSQL database.

## Architecture
* **Frontend:** React.js (User Interface & Form Validation)
* **Backend:** Node.js & Express (API & Business Logic)
* **Database:** PostgreSQL (Data Persistence)

## Security Features
- **Password Hashing:** Implemented `bcrypt` to ensure passwords are never stored in plain text.
- **Environment Variables:** Sensitive credentials are managed via `.env` files.

## How to Run
1. Clone the repository.
2. **Backend:** `cd Backend` -> `npm install` -> `node server.js`
3. **Frontend:** `cd frontend` -> `npm install` -> `npm start`
