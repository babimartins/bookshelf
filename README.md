# 📚 Bookshelf App

Bookshelf is a web application that allows users to search for books, save them to their personal bookshelf, and categorize them as read or unread. The app integrates with the Open Library API for book search and retrieval.

## 🚀 Features
- 🔎 **Search Books**: Find books by title or ISBN with instant fuzzy search.
- 📖 **Book Details**: View detailed information about a book retrieved from the Open Library API.
- 📚 **Personal Bookshelf**: Save books to your personal collection.
- ✅ **Read/Unread Status**: Mark books as read or unread.
- 🔄 **Dark Mode Support**: Switch between light and dark themes.
- 🛡️ **User Authentication**: Sign in via social login to save your bookshelf.

## 🛠️ Tech Stack
### **Frontend**
- React (Vite + TypeScript)
- TailwindCSS
- ShadCN UI
- Cypress (Testing)

### **Backend**
- Node.js with Express
- MongoDB (via Mongoose)
- Jest (Testing)

### **Deployment & DevOps**
- GitHub Actions (CI/CD)
- WSL + VS Code (Development)
- Husky (Pre-commit hooks for linting and formatting)

## 📂 Project Structure
```
/bookshelf
├── backend/     # Backend (Node.js + Express)
├── frontend/    # Frontend (React + Vite + TailwindCSS)
├── .github/     # CI/CD workflows
├── README.md    # Project documentation
└── .gitignore   # Git ignore rules
```

## 🏗️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/bookshelf.git
cd bookshelf
```

### 2️⃣ Setup Backend
```sh
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev
```

### 3️⃣ Setup Frontend
```sh
cd ../frontend
npm install
npm run dev
```

## ✅ Testing
- Run **backend tests**:
  ```sh
  cd backend
  npm test
  ```
- Run **frontend tests**:
  ```sh
  cd frontend
  npm run test
  ```
- Run **Cypress end-to-end tests**:
  ```sh
  cd frontend
  npm run cypress:open
  ```