# Job Portal

This repository contains the code for a **Job Portal** built using **Vite** and **React**. The project provides a platform for job seekers to find job opportunities and for employers to post job listings.


## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/AbhinayAmbati/JobPortal.git
   ```
2. Navigate to the project directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
- Development:
  ```bash
  npm run dev
  ```
- Production Build:
  ```bash
  npm run build
  ```

### Preview Production Build
```bash
npm run preview
```

---

## 🖌 Styling

- The project uses **CSS Modules** and **Tailwind CSS** for styling.
- Custom styles are located in the `src/styles` directory.

---

## 🛠 Technologies Used

- [Vite](https://vitejs.dev/) - Fast frontend tool for building modern web apps.
- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/) - Declarative routing for React.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [Axios](https://axios-http.com/) - Promise-based HTTP client.


## Job Portal Backend

Getting Started

Prerequisites

Make sure you have the following installed on your machine:
- [Java](https://www.java.com/) (JDK 11 or higher)
- [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) for building the project.

Installation

1. Clone this repository:
   git clone https://github.com/yourusername/job-portal-backend.git
2. Navigate to the project directory:
   cd job-portal-backend
3. Configure your environment variables by creating a .env file or setting values directly in the application.properties file:
   spring.datasource.url=jdbc:mysql://localhost:3306/your_db
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   spring.jpa.hibernate.ddl-auto=update

Running the Application

Navigate to the project directory:
   ```bash
   cd backend
   ```

Development Mode:
   ```bash
   mvn spring-boot:run
   ```
Building the Application:
```bash
   mvn clean package
```
---

