# Job Portal API - Postman Collection Guide

## 📋 Overview

This Postman collection provides complete testing coverage for the Job Portal API backend. It includes all CRUD operations for Jobs, Users, Applications, and Authentication endpoints.

## 📁 Files Included

1. **Job_Portal_API.postman_collection.json** - Main collection with all endpoints
2. **Job_Portal_Environment.postman_environment.json** - Environment variables configuration
3. **POSTMAN_SETUP.md** - This guide

## 🚀 Quick Start

### Step 1: Import the Collection

1. Open **Postman** application
2. Click **Import** button (top-left)
3. Select **File** tab
4. Choose `Job_Portal_API.postman_collection.json`
5. Click **Import**

### Step 2: Import the Environment

1. Click the **Settings icon** (gear icon) in the top-right
2. Select **Environments** from sidebar
3. Click **Import**
4. Select `Job_Portal_Environment.postman_environment.json`
5. Click **Import**

### Step 3: Set Active Environment

1. In the top-right dropdown (next to the eye icon), select **Job Portal - Development Environment**

### Step 4: Configure Base URL (if needed)

1. Click on **Job Portal - Development Environment** dropdown
2. Edit the environment
3. Update `base_url` if your server runs on different port (default: `http://localhost:3000`)
4. Save

## 📚 API Endpoints Overview

### Authentication Routes
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user (returns JWT token)

### Jobs API Routes
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Users Routes
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `GET /users/profile` - Get current user profile (requires auth)
- `POST /users` - Create new user

### Applications Routes
- `GET /applications` - Get all applications
- `GET /applications/:id` - Get application by ID
- `GET /applications/status` - Get application status
- `POST /applications` - Create new application

### Web Page Routes
- `GET /` - Home page
- `GET /about` - About page
- `GET /contact` - Contact page
- `GET /jobs` - Jobs listing page
- `GET /jobs/add` - Add job form page
- `GET /jobs/:id` - Job details page

## 🔑 Authentication Flow

### Important: Authentication Setup

The collection uses **JWT Bearer Token** authentication. Here's how it works:

1. **Register** a new user using the "Register User" endpoint
2. **Login** using the "Login User" endpoint
   - The login response includes a JWT token
   - A test script automatically saves this token to the `auth_token` variable
   - This token is used for all protected endpoints

3. All endpoints that require authentication include:
   ```
   Authorization: Bearer {{auth_token}}
   ```

### Login Credentials Examples

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

## 🧪 Testing Workflows

The collection includes pre-built test workflows:

### Complete Auth & Job Flow
This workflow tests the entire lifecycle:
1. Register new user
2. Login user (token auto-saved)
3. Create new job
4. Get all jobs
5. Get single job by ID
6. Update job details
7. Delete job

**To run this workflow:**
1. Navigate to **Test Workflows** folder
2. Click **Complete Auth & Job Flow** collection
3. Click the arrow (▶️) next to the collection name
4. Select "Run" option
5. Postman will execute all requests in sequence

## 📊 Variables & Auto-Population

The collection automatically populates variables after certain requests:

| Variable | Auto-Populated After | Used In |
|----------|---------------------|---------|
| `auth_token` | Login request | All protected endpoints |
| `user_id` | Login request | User operations |
| `user_email` | Login request | User operations |
| `job_id` | Create/Update job | Job operations |
| `application_id` | Create application | Application operations |

## 🔧 Request Body Examples

### Register User
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "job_seeker"  // or "employer"
}
```

### Create Job
```json
{
  "title": "Senior Software Engineer",
  "company": "Tech Corp",
  "location": "San Francisco, CA",
  "salary": "120000-150000",
  "description": "We are looking for an experienced software engineer..."
}
```

### Create Application
```json
{
  "job_id": 1,
  "applicant_name": "John Doe",
  "applicant_email": "john@example.com",
  "resume_link": "https://example.com/resume/john-doe.pdf"
}
```

## ✅ Test Assertions

Many endpoints include automated test assertions that:
- ✓ Verify response status codes (200, 201)
- ✓ Check success messages
- ✓ Validate required fields in response
- ✓ Automatically save IDs to variables for use in subsequent requests

### View Test Results
1. Click on a request
2. Send the request
3. Click the **Tests** tab in the response pane
4. You'll see pass/fail results for each assertion

## 🐛 Troubleshooting

### Issue: "Connection refused" or "Cannot GET /api/jobs"
**Solution:** Make sure your backend server is running
```bash
# In backend folder
npm install
npm start
# or
npm run dev  # with nodemon
```

### Issue: "Token is missing" or 401 Unauthorized
**Solution:** 
1. Run the **Login User** endpoint first
2. Verify the token appears in the `auth_token` variable (check environment)
3. Ensure Authorization header is set to `Bearer {{auth_token}}`

### Issue: "404 Not Found" for /api/jobs but /jobs works
**Solution:** There are two different job route prefixes:
- `/api/jobs` - RESTful API endpoints (returns JSON)
- `/jobs` - Web view endpoints (returns HTML)
Use `/api/jobs` for API testing

### Issue: CORS errors in browser
**Solution:** The backend is already configured for CORS. If you see errors:
1. Verify your frontend URL is in the allowed origins in `backend/app.js`
2. Restart the backend server

## 📝 Running Custom Tests

### Create a Collection Runner Flow

1. Click **Collections** in left sidebar
2. Right-click **Job Portal API** collection
3. Select **Run collection**
4. Choose which requests to run
5. Set delays between requests (e.g., 100ms)
6. Click **Run Job Portal API**
7. View results in real-time

### Test Results Summary
After running a collection, you'll see:
- Total requests sent
- Passed tests
- Failed tests
- Response times
- Failed test details

## 🔐 Security Notes

- **Never commit tokens** to version control
- Tokens in `auth_token` variable are temporary (stored only in Postman memory)
- Clear sensitive data from variables when sharing collections
- Use environment files only for development
- For production: Use separate secure environment file

## 📧 Common Use Cases

### Use Case 1: Post a New Job
1. Login to get auth token
2. Use **Create Job** endpoint with job details
3. Save the returned `job_id`
4. Use this ID to update or delete later

### Use Case 2: Test Job Applications
1. Login as job seeker
2. Use **Get All Jobs** to find job IDs
3. Use **Create Application** with job ID and applicant info
4. Check applications with **Get All Applications**

### Use Case 3: Manage Users
1. Use **Get All Users** to see current users
2. Use **Get User by ID** with specific ID
3. Use **Create User** to add new users

### Use Case 4: Performance Testing
1. Use Collection Runner
2. Configure iterations (number of times to run)
3. Set loop delay
4. Monitor response times in results

## 🎯 Next Steps

1. ✅ Import both JSON files into Postman
2. ✅ Start your backend server (`npm start`)
3. ✅ Try the **Login User** endpoint first
4. ✅ Use **Test Workflows** for complete flows
5. ✅ Refer to endpoint-specific documentation below

## 📖 Detailed Endpoint Documentation

### Authentication

#### POST /auth/register
**Description:** Create a new user account
**Headers:** `Content-Type: application/json`
**Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required)",
  "role": "job_seeker|employer (optional, default: job_seeker)"
}
```
**Response:** User object with JWT token

#### POST /auth/login
**Description:** Authenticate user and receive JWT token
**Headers:** `Content-Type: application/json`
**Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```
**Response:** 
```json
{
  "success": true,
  "token": "jwt_token_string",
  "user": {
    "id": "number",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Jobs API

#### GET /api/jobs
**Description:** Retrieve all job listings
**Response:** Array of job objects

#### GET /api/jobs/:id
**Description:** Retrieve specific job by ID
**Parameters:** `id` (path parameter)
**Response:** Single job object

#### POST /api/jobs
**Description:** Create new job listing
**Authentication:** Required (Bearer token)
**Body:**
```json
{
  "title": "string",
  "company": "string",
  "location": "string",
  "salary": "string",
  "description": "string"
}
```

#### PUT /api/jobs/:id
**Description:** Update existing job
**Authentication:** Required (Bearer token)
**Parameters:** `id` (path parameter)
**Body:** Same as POST /api/jobs

#### DELETE /api/jobs/:id
**Description:** Delete job by ID
**Authentication:** Required (Bearer token)
**Parameters:** `id` (path parameter)

### Users API

#### GET /users
**Description:** Retrieve all users
**Response:** Array of user objects (id, name, email, role)

#### GET /users/:id
**Description:** Retrieve specific user
**Parameters:** `id` (path parameter)

#### POST /users
**Description:** Create new user
**Body:** Same as /auth/register

#### GET /users/profile
**Description:** Get current logged-in user profile
**Authentication:** Required (Bearer token)

### Applications API

#### GET /applications
**Description:** Retrieve all job applications
**Response:** Array of application objects with job details

#### GET /applications/:id
**Description:** Retrieve specific application
**Parameters:** `id` (path parameter)

#### POST /applications
**Description:** Submit new job application
**Authentication:** Required (Bearer token)
**Body:**
```json
{
  "job_id": "number",
  "applicant_name": "string",
  "applicant_email": "string",
  "resume_link": "string (URL)"
}
```

#### GET /applications/status
**Description:** Get application status information

## 🎓 Tips & Best Practices

1. **Use Variables:** Always use `{{variable_name}}` syntax for dynamic values
2. **Test Scripts:** Review the Test scripts to understand what's being validated
3. **Pre-request Scripts:** These run before each request and can modify headers/body
4. **Collection Variables vs Environment:** Collection vars are local, Environment vars are shared
5. **Organize Requests:** Requests are grouped in folders by feature
6. **Mock Responses:** Postman can mock responses without hitting the server
7. **Export Results:** Use Collection Runner to export test results as reports

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Verify backend server is running and accessible
3. Check environment variables are properly set
4. Review request headers and body format
5. Check backend logs for detailed error messages

---

**Last Updated:** June 2024
**Postman Version:** v11.0.0+
**Backend:** Express.js with MySQL
