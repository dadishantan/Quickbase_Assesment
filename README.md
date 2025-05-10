# 🧩 React Custom Form Field Builder

This project is a React.js application that demonstrates dynamic form rendering, custom validations, and modular component design — driven entirely by configurable JSON data.

---

## 🚀 Features

- ⚛️ Built using **React.js** (Create React App)
- 🧩 **Custom form field builder** using JSON (`items.json`)
- ✅ Field-level validation logic for inputs
- 🧪 Unit testing with **Jest + React Testing Library**
- 🔄 Simulated backend via `MockService.js`
- 📦 Clean, modular codebase for reusability

---

## 📁 Project Structure

```
project-root/
├── public/              # Static assets and HTML entry point
├── src/
│   ├── App.js           # Main application
│   ├── App.css          # App styling
│   ├── index.js         # Entry point for React
│   ├── items.json       # JSON configuration for form fields
│   ├── Validations.js   # Validation rules per field
│   ├── MockService.js   # Simulated backend submission
│   ├── FieldBuilder.test.js  # Unit tests for form logic
│   └── App.test.js
├── package.json         # Dependencies and scripts
└── README.md
```

---

## 🛠 Getting Started

### 1. 📦 Install Dependencies
```bash
npm install
```

### 2. ▶️ Run the Application
```bash
npm start
```

Navigate to: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Run Tests

```bash
npm test
```

This will run all unit tests to ensure validation logic and field rendering behave correctly.

---

## 🧠 Key Concepts

- **Dynamic Forms** – Forms rendered based on JSON configuration
- **Reusable Validation Logic** – Centralized rules via `Validations.js`
- **Testable Architecture** – Components are decoupled for easy testing
- **Mocked Services** – Simulated data submission layer

---

## ✅ Technologies Used

- React.js
- JavaScript (ES6+)
- Jest
- React Testing Library

---

## 📄 License

MIT — feel free to use, extend, and adapt for your own custom form handling needs.

---

## 🙋‍♂️ Author

**Shantan Dadi**  
