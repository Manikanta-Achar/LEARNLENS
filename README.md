# 📖 LearnLens AI

**AI-Powered Personalized Learning Platform**

LearnLens AI is an AI-powered learning platform that helps students study more efficiently by analyzing their study materials, identifying important topics, generating quizzes, analyzing quiz performance, and providing personalized study recommendations.

---

## 🚀 Problem

Students often spend a lot of time reading lengthy PDFs and study notes to identify important topics. Preparing practice questions manually, evaluating performance, and identifying weak areas can also be time-consuming.

Students need a simple system that can transform their existing study materials into a personalized learning experience.

---

## 💡 Solution

LearnLens AI creates a complete AI-assisted learning cycle:

**Study Material → Important Topics → AI Quiz → Performance Analysis → Recommendations**

Users can:

* 📄 Upload a PDF or paste study material
* ⭐ Identify important topics using AI
* 📝 Generate quizzes based on selected topics
* 🎯 Choose the number of quiz questions
* 📊 Analyze quiz performance
* 💡 Receive personalized study recommendations

---

## ✨ Features

### 📄 Study Materials

* Upload PDF study materials
* Paste text-based study materials
* Store materials securely for the logged-in user
* View previously uploaded materials

### ⭐ Important Topics

* Analyze study material using AI
* Identify important topics
* Display topic importance
* Select topics for quiz generation

### 📝 AI Quiz Generation

* Generate quizzes from selected topics
* Choose the number of questions
* Multiple-choice questions
* Submit answers and receive results

### 📊 Quiz Analysis

* View total questions
* View correct and incorrect answers
* Calculate quiz score
* Review quiz performance

### 🎯 Personalized Recommendations

* Analyze quiz performance
* Identify areas that need more attention
* Provide study recommendations based on the score

### 👤 User Authentication

* User registration
* User login
* Protected user-specific data
* JWT-based authentication

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

### AI

* Google Gemini API

### PDF Processing

* PDF2JSON

### Deployment

* Vercel

---

## 🏗️ Project Structure

```text
LearnLens-AI/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 How It Works

### 1. Register / Login

Create an account and log in to access the learning dashboard.

### 2. Add Study Material

Upload a PDF or paste your study material.

### 3. Analyze Material

LearnLens AI analyzes the material and identifies important topics.

### 4. Select Topics

Choose the topics you want to practice.

### 5. Generate Quiz

Select the number of questions and generate an AI-powered quiz.

### 6. Submit Quiz

Answer all questions and submit the quiz.

### 7. Analyze Performance

The system calculates your score and shows your correct and incorrect answers.

### 8. Get Recommendations

Based on your quiz performance, LearnLens AI provides recommendations about what to study next.

---

## 🔐 Environment Variables

### Backend

Create a `.env` file inside the `backend` folder:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend

Create a `.env` file inside the `frontend` folder:

```env
VITE_BACKEND_URL=http://localhost:5000
```

**Do not upload `.env` files or API keys to GitHub.**

---

## ▶️ Run Locally

### Clone the repository

```bash
git clone https://github.com/YourUsername/LearnLens-AI.git
```

### Start Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

## 🌐 Deployment

The project can be deployed using **Vercel**.

* Frontend → Vercel
* Backend → Vercel
* Database → MongoDB Atlas
* AI → Google Gemini API

---

## 🎯 Future Improvements

* More detailed topic-wise performance analysis
* Personalized study schedules
* Flashcard generation
* Progress tracking
* More advanced learning recommendations
* Support for additional study material formats

---

## 👨‍💻 Developer

**Manikanta Achar**

B.Tech Information Science Engineering Student
MERN Stack Developer | AI/ML Enthusiast

---

## 📌 Project Goal

The goal of LearnLens AI is to make studying more **personalized, efficient, and focused** by using AI to transform ordinary study materials into an interactive learning experience.
