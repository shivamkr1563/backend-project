# 📋 API TESTING EXAMPLES

## Test Using Postman (Easiest Method)

### Import Collection
1. Open Postman
2. Import `User_Management_API.postman_collection.json`
3. Run requests from the collection

---

## Test Using PowerShell

### 1. Get API Information
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/" -Method GET | ConvertTo-Json
```

### 2. Get All Users (Empty Initially)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method GET | ConvertTo-Json
```

### 3. Create a User
```powershell
$body = @{
    name = "Alice Johnson"
    email = "alice@example.com"
    age = 28
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST `
    -Body $body -ContentType "application/json" | ConvertTo-Json
```

### 4. Create Another User
```powershell
$body = @{
    name = "Bob Smith"
    email = "bob@example.com"
    age = 35
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST `
    -Body $body -ContentType "application/json" | ConvertTo-Json
```

### 5. Get All Users (Should Show 2)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method GET | ConvertTo-Json
```

### 6. Get Specific User
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method GET | ConvertTo-Json
```

### 7. Update User
```powershell
$body = @{
    name = "Alice Updated"
    age = 29
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method PUT `
    -Body $body -ContentType "application/json" | ConvertTo-Json
```

### 8. Delete User
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/users/2" -Method DELETE | ConvertTo-Json
```

### 9. Test Validation Error
```powershell
$body = @{
    name = ""
    email = "invalid-email"
} | ConvertTo-Json

try {
    Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST `
        -Body $body -ContentType "application/json"
} catch {
    Write-Host "Error (Expected): $($_.ErrorDetails.Message)"
}
```

### 10. Test Not Found Error
```powershell
try {
    Invoke-RestMethod -Uri "http://localhost:3000/users/999" -Method GET
} catch {
    Write-Host "Error (Expected): $($_.ErrorDetails.Message)"
}
```

---

## Test Using cURL (Windows)

### 1. Get All Users
```bash
curl http://localhost:3000/users
```

### 2. Create User
```bash
curl -X POST http://localhost:3000/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"age\":25}"
```

### 3. Update User
```bash
curl -X PUT http://localhost:3000/users/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Updated Name\"}"
```

### 4. Delete User
```bash
curl -X DELETE http://localhost:3000/users/1
```

---

## Expected Responses

### Success - Get All Users
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "age": 28,
      "createdAt": "2025-10-31T16:00:00.000Z",
      "updatedAt": "2025-10-31T16:00:00.000Z"
    }
  ]
}
```

### Success - Create User
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 28,
    "createdAt": "2025-10-31T16:00:00.000Z",
    "updatedAt": "2025-10-31T16:00:00.000Z"
  }
}
```

### Error - Validation
```json
{
  "success": false,
  "errors": [
    "Name is required and must be a non-empty string",
    "Valid email is required"
  ]
}
```

### Error - Not Found
```json
{
  "success": false,
  "error": "User with ID 999 not found"
}
```

---

## Complete Test Script (PowerShell)

Save as `test-api.ps1`:

```powershell
# Test Script for User Management API
Write-Host "=== User Management API Test Suite ===" -ForegroundColor Green

# Test 1: Get API Info
Write-Host "`n1. Testing API Root..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:3000/" -Method GET | ConvertTo-Json

# Test 2: Get All Users (Empty)
Write-Host "`n2. Getting all users (should be empty)..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method GET | ConvertTo-Json

# Test 3: Create First User
Write-Host "`n3. Creating first user..." -ForegroundColor Yellow
$user1 = @{ name = "Alice Johnson"; email = "alice@example.com"; age = 28 } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST -Body $user1 -ContentType "application/json" | ConvertTo-Json

# Test 4: Create Second User
Write-Host "`n4. Creating second user..." -ForegroundColor Yellow
$user2 = @{ name = "Bob Smith"; email = "bob@example.com"; age = 35 } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method POST -Body $user2 -ContentType "application/json" | ConvertTo-Json

# Test 5: Get All Users
Write-Host "`n5. Getting all users..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:3000/users" -Method GET | ConvertTo-Json

# Test 6: Get Specific User
Write-Host "`n6. Getting user by ID..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method GET | ConvertTo-Json

# Test 7: Update User
Write-Host "`n7. Updating user..." -ForegroundColor Yellow
$update = @{ name = "Alice Updated"; age = 29 } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/users/1" -Method PUT -Body $update -ContentType "application/json" | ConvertTo-Json

# Test 8: Delete User
Write-Host "`n8. Deleting user..." -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:3000/users/2" -Method DELETE | ConvertTo-Json

Write-Host "`n=== All Tests Completed ===" -ForegroundColor Green
```

Run with: `.\test-api.ps1`

---

## Verify Data Persistence

After running tests, check the `data/users.json` file:
```powershell
Get-Content data/users.json | ConvertFrom-Json | ConvertTo-Json
```

---

## Tips

1. **Always set Content-Type header** for POST/PUT requests
2. **Check server logs** in the terminal for request tracking
3. **Verify data in users.json** to confirm persistence
4. **Test error cases** to validate error handling
5. **Use Postman collection** for the easiest testing experience

**Server URL:** http://localhost:3000
**Postman Collection:** User_Management_API.postman_collection.json
