# 👨‍💼 Employee Portal

A full-stack Employee Management Portal built using React, Node.js, Express, and PostgreSQL.

## 🚀 Features

- Add new employees
- Edit employee details
- Delete employees
- Search employees by name
- Filter employees by department
- Form validation
- Employee dashboard statistics
- PostgreSQL database integration
- REST API integration
- Responsive user interface

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- REST API

### Database

- PostgreSQL

### Development Tools

- Visual Studio Code
- pgAdmin
- Git
- GitHub

## 📁 Project Structure

```text
employee-portal/
│
├── backed/
│   ├── src/
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd employee-portal
```

### 2. Install Backend Dependencies

Open a terminal:

```bash
cd backed
```

Install dependencies:

```bash
npm install
```

### 3. Configure PostgreSQL

Create a PostgreSQL database named:

```text
employee_portal
```

Make sure PostgreSQL is running.

### 4. Configure Environment Variables

Inside the `backed` folder, create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_portal
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
```

Replace `YOUR_POSTGRES_PASSWORD` with your PostgreSQL password.

⚠️ Never upload the real `.env` file to GitHub.

## ▶️ Run the Backend

From the `backed` folder:

```bash
node .\src\server.js
```

The backend will run on:

```text
http://localhost:5000
```

## 💻 Run the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

Open the URL shown by Vite, for example:

```text
http://localhost:5173
```

## 🔗 API Endpoints

### Get All Employees

```http
GET /api/employees
```

### Add Employee

```http
POST /api/employees
```

### Update Employee

```http
PUT /api/employees/:id
```

### Delete Employee

```http
DELETE /api/employees/:id
```

## 🗄️ Database

The application uses PostgreSQL to store employee information.

Employee records contain information such as:

- ID
- Name
- Email
- Department
- Salary

## 📊 Dashboard

The dashboard displays employee statistics such as:

- Total Employees
- IT Employees
- CSE Employees
- Average Salary

## 🔍 Employee Management

The application allows users to:

1. Add employees
2. Edit employee information
3. Delete employees
4. Search employees by name
5. Filter employees by department
6. Validate employee form data

## 🔐 Security

Sensitive database credentials are stored in environment variables.

The `.env` file should never be committed to GitHub.

## 📱 Responsive Design

The application is designed to work on different screen sizes including:

- Desktop
- Laptop
- Tablet
- Mobile

## 🔮 Future Enhancements

- Employee login and authentication
- Role-based access control
- Employee profile pages
- Pagination
- Sorting
- Salary range filtering
- Export employee data
- Admin dashboard
- Deployment to cloud platforms

## 👨‍💻 Author

**Sunil Pattar**

## 📄 License

This project is created for educational and portfolio purposes.