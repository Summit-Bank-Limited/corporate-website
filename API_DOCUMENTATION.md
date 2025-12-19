# Enquiry API Documentation

## Endpoint
**POST** `https://products.summitbankng.com/mtd/enquiry/create`

## Request Body

### Required Fields
- `name` (string, required): Full name of the customer (will be trimmed)
- `email` (string, required): Email address (will be trimmed, must be valid email format)
- `subject` (string, required): Subject of the enquiry (will be trimmed). Format: "{subjectType}: {subjectText}" (e.g., "Enquiries: General question" or "Complaints: Issue with account")
- `message` (string, required): Message text (will be trimmed, max 1500 characters)

### Optional Fields
- `nubanAccountNumber` (string, optional): 10-digit NUBAN account number (will be trimmed, must be exactly 10 digits if provided)

---

## Request Examples

### Example 1: Enquiry with Account Number (Complaint)
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Complaints: Issue with account",
  "nubanAccountNumber": "1234567890",
  "message": "I have been experiencing issues with my account balance. The transactions are not reflecting correctly. Please investigate and get back to me as soon as possible."
}
```

### Example 2: Enquiry without Account Number (General Enquiry)
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "subject": "Enquiries: General question",
  "message": "I would like to know more about your MTD service and the interest rates available."
}
```

### Example 3: Enquiry with Empty Account Number
```json
{
  "name": "Bob Johnson",
  "email": "bob.johnson@example.com",
  "subject": "Enquiries: Investment options",
  "nubanAccountNumber": "",
  "message": "What are the minimum investment amounts for MTD?"
}
```

---

## Response Examples

### Success Response (201 Created)

#### With Account Number
```json
{
  "success": true,
  "message": "Enquiry submitted successfully.",
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Complaints: Issue with account",
    "nubanAccountNumber": "1234567890",
    "emailSent": true
  }
}
```

#### Without Account Number
```json
{
  "success": true,
  "message": "Enquiry submitted successfully.",
  "data": {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "subject": "Enquiries: General question",
    "nubanAccountNumber": null,
    "emailSent": true
  }
}
```

---

### Error Responses

#### 400 Bad Request - Missing Required Fields
```json
{
  "success": false,
  "error": "Name, email, subject, and message fields are required."
}
```

#### 400 Bad Request - Message Too Long
```json
{
  "success": false,
  "error": "Message cannot exceed 1500 characters."
}
```

#### 400 Bad Request - Invalid Email Format
```json
{
  "success": false,
  "error": "Invalid email format."
}
```

#### 400 Bad Request - Invalid NUBAN Account Number
```json
{
  "success": false,
  "error": "NUBAN account number must be 10 digits."
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to process enquiry."
}
```

---

## Validation Rules

1. **name**: Required, non-empty string (whitespace will be trimmed)
2. **email**: Required, must be valid email format (e.g., `user@example.com`)
3. **subject**: Required, non-empty string (whitespace will be trimmed)
4. **nubanAccountNumber**: Optional, if provided must be exactly 10 digits (e.g., `1234567890`)
5. **message**: Required, non-empty string, maximum 1500 characters (whitespace will be trimmed)