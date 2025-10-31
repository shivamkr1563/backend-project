# 🚀 Quick Start Guide

## Prerequisites Check
- [ ] Node.js installed (v14+)
- [ ] npm installed (v6+)
- [ ] Postman installed
- [ ] Terminal/Command Prompt ready

## Setup (2 minutes)

### Step 1: Install Dependencies
```bash
npm install
```
**Expected Output:** "added 100 packages, found 0 vulnerabilities"

### Step 2: Start Server
```bash
npm start
```
**Expected Output:** 
```
Server is running on http://localhost:3000
Environment: development
```

## Testing (5 minutes)

### Option A: Using Postman (Recommended)
1. Open Postman
2. Click **Import**
3. Select `User_Management_API.postman_collection.json`
4. Run requests in order from top to bottom

### Option B: Using Browser/cURL
```bash
# Test if server is running
curl http://localhost:3000/

# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","age":25}'

# Get all users
curl http://localhost:3000/users
```

## API Endpoints

| Method | URL | Body (JSON) |
|--------|-----|-------------|
| GET | http://localhost:3000/users | - |
| POST | http://localhost:3000/users | `{"name":"...","email":"...","age":...}` |
| PUT | http://localhost:3000/users/1 | `{"name":"..."}` (any field) |
| DELETE | http://localhost:3000/users/1 | - |

## Common Commands

```bash
# Start server (normal)
npm start

# Start server (auto-reload)
npm run dev

# Stop server
Ctrl + C

# Reset data
# Delete content of data/users.json and restart
```

## Troubleshooting

**Port already in use?**
- Change port in `server.js` line 8: `const PORT = 3001;`

**Cannot POST data?**
- Add header: `Content-Type: application/json`

**Server not starting?**
- Run `npm install` again
- Check Node.js version: `node --version`

## Next Steps

1. ✅ Review `README.md` for full documentation
2. ✅ Check `TESTING_GUIDE.md` for detailed test cases
3. ✅ Explore `PROJECT_SUMMARY.md` for project overview
4. ✅ Test all endpoints using Postman collection

## File Locations

```
📁 RemitBeeBackend/
├── 📄 server.js                    # Start here
├── 📁 controllers/                 # Business logic
├── 📁 routes/                      # API routes
├── 📁 data/users.json              # Data storage
├── 📄 User_Management_API.postman_collection.json
└── 📖 README.md                    # Full docs
```

## Success Checklist

- [ ] Dependencies installed (npm install)
- [ ] Server running (npm start)
- [ ] Tested GET /users (empty array)
- [ ] Created a user (POST /users)
- [ ] Retrieved users (GET /users)
- [ ] Updated a user (PUT /users/:id)
- [ ] Deleted a user (DELETE /users/:id)
- [ ] Tested error cases (invalid data)
- [ ] Checked data persistence (users.json)

## Support

**Need help?**
- Check `README.md` for detailed documentation
- Review `TESTING_GUIDE.md` for testing instructions
- Look at code comments in source files

---

**You're ready to go! 🎉**

The server is already running on http://localhost:3000
Import the Postman collection and start testing!
