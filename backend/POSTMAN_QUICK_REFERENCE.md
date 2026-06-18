# Job Portal API - Quick Reference

## 🚀 Quick Import Steps
1. **Open Postman** → Click **Import**
2. Select both JSON files from `/backend/` folder:
   - `Job_Portal_API.postman_collection.json`
   - `Job_Portal_Environment.postman_environment.json`
3. Set environment to **Job Portal - Development Environment**
4. Start backend: `npm start` (in backend folder)

---

## 📋 All Endpoints at a Glance

### 🔐 Auth
```
POST   /auth/register          ➜ Create account
POST   /auth/login             ➜ Login (gets token ⭐)
```

### 💼 Jobs (API)
```
GET    /api/jobs               ➜ List all jobs
GET    /api/jobs/:id           ➜ Get job details
POST   /api/jobs               ➜ Create job ⭐
PUT    /api/jobs/:id           ➜ Update job ⭐
DELETE /api/jobs/:id           ➜ Delete job ⭐
```

### 👥 Users
```
GET    /users                  ➜ List all users
GET    /users/:id              ➜ Get user
GET    /users/profile          ➜ Get my profile ⭐
POST   /users                  ➜ Create user
```

### 📋 Applications
```
GET    /applications           ➜ List all applications
GET    /applications/:id       ➜ Get application
GET    /applications/status    ➜ Get status
POST   /applications           ➜ Apply for job ⭐
```

### 🖥️ Web Pages (HTML)
```
GET    /                       ➜ Home
GET    /about                  ➜ About page
GET    /contact                ➜ Contact page
GET    /jobs                   ➜ Jobs page
GET    /jobs/add               ➜ Add job form
GET    /jobs/:id               ➜ Job details
```

⭐ = Requires authentication header: `Authorization: Bearer {{auth_token}}`

---

## 🔑 Authentication

### Step 1: Register (Optional, if new user)
```json
POST /auth/register
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "Password123",
  "role": "job_seeker"
}
```

### Step 2: Login
```json
POST /auth/login
{
  "email": "you@example.com",
  "password": "Password123"
}
```
✅ Token auto-saved to `{{auth_token}}` variable

### Step 3: Use Token (Already set in headers!)
```
Authorization: Bearer {{auth_token}}
```

---

## 📝 Sample Payloads

### Create Job
```json
{
  "title": "Senior Engineer",
  "company": "Tech Corp",
  "location": "NYC",
  "salary": "120000-150000",
  "description": "Exciting role..."
}
```

### Apply for Job
```json
{
  "job_id": 1,
  "applicant_name": "John Doe",
  "applicant_email": "john@example.com",
  "resume_link": "https://link-to-resume.pdf"
}
```

### Create User
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Password123",
  "role": "employer"
}
```

---

## 🎯 Variables

| Variable | Purpose | Auto-Fills |
|----------|---------|-----------|
| `base_url` | Server address | Never (default: localhost:3000) |
| `auth_token` | JWT token | After login ✅ |
| `user_id` | Current user | After login ✅ |
| `user_email` | Current user email | After login ✅ |
| `job_id` | Current job | After create/update job ✅ |
| `application_id` | Current application | After create application ✅ |

---

## ⚡ Common Testing Flow

1. **Login User**
   - Gets JWT token automatically

2. **Create Job**
   - Uses token from step 1
   - Saves job_id automatically

3. **Get All Jobs**
   - Lists all jobs (no auth needed)

4. **Get Single Job**
   - Uses {{job_id}} from step 2

5. **Update Job**
   - Uses {{job_id}} and token

6. **Delete Job**
   - Uses {{job_id}} and token

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Connection refused" | Start backend: `npm start` |
| "401 Unauthorized" | Run login first, check token |
| "404 Not Found" | Check URL - use `/api/jobs` not `/jobs` for API |
| Token not saving | Check **Tests** tab has test scripts |
| CORS error | Update backend/app.js allowed origins |

---

## 🎮 Run Test Workflow

1. Open **Collections**
2. Click **Job Portal API** collection
3. Click **▶️** (play icon)
4. Select **Run collection**
5. Click **Run Job Portal API**
6. Watch tests execute in real-time!

---

## 💡 Tips

✅ Use **Pre-built Workflows** folder for complete test scenarios
✅ Token auto-populates from login response
✅ IDs auto-save for use in subsequent requests
✅ All required headers already configured
✅ Sample data provided in every request
✅ Test assertions verify responses automatically

---

## 📊 Request Status Codes

- **200** = Success ✅
- **201** = Created ✅
- **400** = Bad Request ❌ (check payload)
- **401** = Unauthorized ❌ (need valid token)
- **404** = Not Found ❌ (check ID/URL)
- **409** = Conflict ❌ (email already exists)
- **500** = Server Error ❌ (check backend logs)

---

## 🔗 Collection Folders

```
📦 Job Portal API
├── 🔐 Authentication (Login, Register)
├── 💼 Jobs API (CRUD operations)
├── 👥 Users API (User management)
├── 📋 Applications API (Job applications)
├── 🖥️ Web Pages (HTML views)
└── 📝 Test Workflows (Complete flows)
```

---

## ✅ Pre-flight Checklist

- [ ] Backend running (`npm start`)
- [ ] Collection imported
- [ ] Environment imported
- [ ] Environment selected in Postman
- [ ] base_url matches your server
- [ ] Login to get token
- [ ] Ready to test! 🚀

---

## 🎓 Best Practices

1. **Always login first** - Most endpoints need token
2. **Check Test tab** - See what's being validated
3. **Use variables** - Don't hardcode values
4. **Run workflows** - Test complete user journeys
5. **Check console** - See automated variable saves

---

**Need help?** Check the detailed `POSTMAN_SETUP.md` guide!
