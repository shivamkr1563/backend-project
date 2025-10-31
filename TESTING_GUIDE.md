# Testing Guide - User Management API

## Quick Start Testing

### Prerequisites
1. Server should be running: `npm start`
2. Postman should be installed
3. Server running on: `http://localhost:3000`

## Option 1: Import Postman Collection (Recommended)

1. Open Postman
2. Click **Import** button (top left)
3. Select the file: `User_Management_API.postman_collection.json`
4. Collection will appear in your sidebar with 8 pre-configured requests

## Option 2: Manual Testing Steps

### Test Sequence (Follow in Order)

#### 1. Test GET / (API Root)
```
GET http://localhost:3000/
```
**Expected Result:** Welcome message with endpoint list

---

#### 2. Test GET /users (Empty Database)
```
GET http://localhost:3000/users
```
**Expected Result:** 
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

---

#### 3. Test POST /users (Create First User)
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28
}
```
**Expected Result:** 201 Created with user object (ID will be 1)

---

#### 4. Test POST /users (Create Second User)
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Bob Smith",
  "email": "bob@example.com",
  "age": 35
}
```
**Expected Result:** 201 Created with user object (ID will be 2)

---

#### 5. Test POST /users (Create Third User)
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Charlie Brown",
  "email": "charlie@example.com",
  "age": 42
}
```
**Expected Result:** 201 Created with user object (ID will be 3)

---

#### 6. Test GET /users (View All Users)
```
GET http://localhost:3000/users
```
**Expected Result:** Array with 3 users

---

#### 7. Test GET /users/:id (Get Specific User)
```
GET http://localhost:3000/users/1
```
**Expected Result:** Alice's user object

---

#### 8. Test PUT /users/:id (Update User)
```
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "name": "Alice Johnson Updated",
  "age": 29
}
```
**Expected Result:** 200 OK with updated user object

---

#### 9. Test DELETE /users/:id (Delete User)
```
DELETE http://localhost:3000/users/2
```
**Expected Result:** 200 OK with deleted user object (Bob)

---

#### 10. Test GET /users (Verify Deletion)
```
GET http://localhost:3000/users
```
**Expected Result:** Array with 2 users (Alice and Charlie, Bob removed)

---

## Error Testing

### Test Validation Errors

#### Test 1: Missing Required Fields
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "age": 25
}
```
**Expected:** 400 Bad Request with validation errors

---

#### Test 2: Invalid Email Format
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Test User",
  "email": "invalid-email",
  "age": 25
}
```
**Expected:** 400 Bad Request with email validation error

---

#### Test 3: Invalid Age
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "age": 200
}
```
**Expected:** 400 Bad Request with age validation error

---

#### Test 4: Duplicate Email
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "Another Alice",
  "email": "alice@example.com",
  "age": 30
}
```
**Expected:** 400 Bad Request with duplicate email error

---

#### Test 5: User Not Found
```
GET http://localhost:3000/users/999
```
**Expected:** 404 Not Found

---

#### Test 6: Invalid User ID Format
```
GET http://localhost:3000/users/abc
```
**Expected:** 400 Bad Request with invalid ID error

---

#### Test 7: Update Non-existent User
```
PUT http://localhost:3000/users/999
Content-Type: application/json

{
  "name": "Test"
}
```
**Expected:** 404 Not Found

---

#### Test 8: Delete Non-existent User
```
DELETE http://localhost:3000/users/999
```
**Expected:** 404 Not Found

---

## Testing Checklist

### Functionality Tests ✓
- [ ] GET /users returns all users
- [ ] GET /users/:id returns specific user
- [ ] POST /users creates new user
- [ ] PUT /users/:id updates user
- [ ] DELETE /users/:id deletes user
- [ ] Data persists in users.json
- [ ] Auto-incrementing IDs work correctly
- [ ] Timestamps (createdAt, updatedAt) are set

### Validation Tests ✓
- [ ] Name validation (required, non-empty)
- [ ] Email validation (required, valid format)
- [ ] Age validation (optional, 0-150)
- [ ] Duplicate email prevention
- [ ] Email case-insensitivity
- [ ] Partial updates work (PUT with some fields)

### Error Handling Tests ✓
- [ ] 400 for validation errors
- [ ] 404 for non-existent resources
- [ ] 500 for server errors
- [ ] Appropriate error messages
- [ ] Invalid ID format handling
- [ ] Empty request body handling

### HTTP Status Codes ✓
- [ ] 200 OK for successful GET, PUT, DELETE
- [ ] 201 Created for successful POST
- [ ] 400 Bad Request for validation errors
- [ ] 404 Not Found for missing resources
- [ ] 500 Internal Server Error for server issues

## Expected Response Formats

### Success Response (GET, PUT, DELETE)
```json
{
  "success": true,
  "data": { /* user object */ }
}
```

### Success Response (POST)
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { /* user object */ }
}
```

### Success Response (GET All)
```json
{
  "success": true,
  "count": 2,
  "data": [ /* array of users */ ]
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### Validation Error Response
```json
{
  "success": false,
  "errors": [
    "Name is required and must be a non-empty string",
    "Valid email is required"
  ]
}
```

## User Object Structure
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "createdAt": "2025-10-31T10:00:00.000Z",
  "updatedAt": "2025-10-31T10:00:00.000Z"
}
```

## Tips for Testing

1. **Test in Order**: Follow the test sequence to avoid dependency issues
2. **Check users.json**: Verify data is being saved to `data/users.json`
3. **Watch Server Logs**: Monitor console for request logs
4. **Reset Data**: Delete contents of `users.json` and restart server to reset
5. **Use Postman Environment**: Set base URL as variable for easier testing
6. **Test Edge Cases**: Empty strings, very long names, special characters
7. **Concurrent Requests**: Test multiple simultaneous requests

## Common Issues & Solutions

### Issue: Server not starting
**Solution:** Check if port 3000 is already in use. Change PORT in server.js

### Issue: Cannot POST/PUT data
**Solution:** Ensure Content-Type header is set to "application/json"

### Issue: Users not persisting
**Solution:** Check file permissions on data/users.json

### Issue: Validation not working
**Solution:** Verify request body format and required fields

## Performance Testing

Test with multiple users (suggested: 100+ records):
```javascript
// In Postman, use Tests tab with this script:
for (let i = 1; i <= 100; i++) {
  pm.sendRequest({
    url: 'http://localhost:3000/users',
    method: 'POST',
    header: 'Content-Type: application/json',
    body: {
      mode: 'raw',
      raw: JSON.stringify({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        age: 20 + (i % 50)
      })
    }
  }, (err, res) => {
    console.log(`Created user ${i}`);
  });
}
```

## Postman Collection Features

The included collection has:
- 8 pre-configured requests
- Detailed descriptions for each endpoint
- Example request bodies
- Test cases for validation and errors
- Ready to run without modification

**Happy Testing! 🚀**
