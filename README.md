# TreeFeatureCollector

TreeFeatureCollector is a mobile application for collecting and documenting tree defects  
(e.g. cavities, wood-decaying fungi, damaged bark, broken branches).

The application allows users to:
- take or select photos of tree defects
- assign a severity level (1–5)
- add a textual description
- browse their own uploaded images in a gallery
- view image details

The project consists of a **mobile application** and a **separate backend server**.

---

## Mobile Application

- Built with **React Native** using **Expo**
- Runs in **Expo Go** (free to download from the App Store / Google Play)
- No native build required for demonstration

### Running the mobile app

1. Install **Expo Go** on your mobile device  
   (available for free on the App Store and Google Play)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the mobile project:
   ```env
   EXPO_PUBLIC_API_URL=https://treefeaturecollectorserver.onrender.com
   ```

4. Start the Expo development server:
   ```bash
   npx expo start
   ```

5. Scan the QR code using Expo Go

---

## Test Users

For demonstration purposes, the following users are pre-created in Supabase Auth:

| Email           | Password |
|-----------------|----------|
| user1@test.com  | heslo    |
| user2@test.com  | heslo    |
| user3@test.com  | heslo    |

Each user can only see **their own uploaded images**.

---

## Backend Server

- Implemented in **Node.js** using **Express**
- Runs as a **separate Git repository**
- Deployed publicly at:

```
https://treefeaturecollectorserver.onrender.com/
```

- Server runs on free tier, so there is possibility that it will be asleep.
- Please check ```https://treefeaturecollectorserver.onrender.com/health``` before running app 
- It will either return "alive" or will wake up server

### Backend Responsibilities

- User authentication (via Supabase Auth)
- Image upload handling
- Storing images in Supabase Storage
- Storing metadata (severity, description, owner) in the database
- Providing REST API endpoints for image listing and detail

---

## Server Environment Variables

The backend server uses attached `.env` configuration.

> The `SUPABASE_SERVICE_ROLE_KEY` is used **only on the server** and is never exposed to the mobile application.

---

## Architecture Overview

```
Mobile App (Expo / React Native)
        |
        |  REST API (fetch)
        v
Backend Server (Express)
        |
        v
Supabase
 - Authentication
 - PostgreSQL Database
 - Storage (Images)
```

- Authentication uses Supabase access tokens
- The backend server validates the token and determines the user identity
- Each uploaded image is linked to the authenticated user

---

## Notes & Limitations

- The application is **not production-ready**
- Error handling and UI polish are intentionally minimal
- Image resizing / thumbnails are not implemented
- No offline support

---

## Assignment Scope Compliance

- ✔ Mobile application implemented in React Native
- ✔ Backend implemented in Node.js
- ✔ Image collection with severity and description
- ✔ User-specific data access
- ✔ Clear separation of client and server
- ✔ README describing setup and usage

---

## Author
Jaroslav Hejný

TreeFeatureCollector – demonstration project
