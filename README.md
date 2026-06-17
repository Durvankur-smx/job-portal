# Job Portal Management System

Full-stack project structure for a Job Portal Management System using Node.js, Express.js, MySQL, EJS, HTML, CSS, and JavaScript.

## Tech Stack

- Backend: Node.js, Express.js, MySQL, EJS
- Frontend: HTML, CSS, JavaScript
- Architecture: MVC for backend

## Folder Structure

```text
job-portal-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── jobController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── applicationModel.js
│   │   ├── jobModel.js
│   │   └── userModel.js
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── main.js
│   ├── routes/
│   │   ├── applicationRoutes.js
│   │   ├── jobRoutes.js
│   │   └── userRoutes.js
│   ├── views/
│   │   ├── pages/
│   │   │   ├── applications.ejs
│   │   │   ├── error.ejs
│   │   │   ├── home.ejs
│   │   │   ├── job-detail.ejs
│   │   │   ├── jobs.ejs
│   │   │   └── users.ejs
│   │   └── partials/
│   │       ├── footer.ejs
│   │       ├── header.ejs
│   │       └── navbar.ejs
│   ├── .env.example
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── index.html
└── README.md
```

## Folder Explanation

- `backend/config`: Database and environment configuration.
- `backend/controllers`: Request handlers that receive route calls and coordinate model/view logic.
- `backend/models`: MySQL query logic and data access layer.
- `backend/routes`: Express route definitions for jobs, users, and applications.
- `backend/middleware`: Shared Express middleware such as authentication and error handling.
- `backend/views`: EJS templates rendered on the server.
- `backend/views/partials`: Reusable EJS layout parts: header, footer, and navbar.
- `backend/public`: Static files served by Express for the EJS pages.
- `frontend`: Separate static frontend folder with HTML, CSS, JavaScript, and assets.

## Run Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Update `.env` with your MySQL credentials before running database-backed pages.
