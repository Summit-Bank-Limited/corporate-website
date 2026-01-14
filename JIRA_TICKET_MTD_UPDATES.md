# JIRA Ticket: MTD Application Form Enhancements

## Title/Topic
**Add Account Type Selection and Corporate Verification Support to MTD Application Form**

---

## Description

### Summary
Enhanced the Mudarabah Term Deposit (MTD) application form to support both Individual and Corporate account types with separate verification flows. The form now includes an account type selection step and uses different API endpoints based on the selected account type.

### Key Features Implemented

1. **Account Type Selection**
   - Added new step in the application flow to select between Individual and Corporate accounts
   - Users must select account type before proceeding to verification
   - Visual selection interface with clear distinction between account types

2. **Dynamic Verification Flow**
   - **Individual Accounts**: Uses existing verification endpoint with Account Number + BVN
   - **Corporate Accounts**: Uses new corporate verification endpoint with Account Number + TIN (Tax Identification Number)
   - Conditional field rendering based on selected account type

3. **Security Enhancements**
   - Staff ID is now masked in the UI (e.g., "SB25****") for privacy
   - Full staff ID still sent to backend for processing

4. **Dynamic Minimum Investment Amount**
   - Investment amount validation now uses the minimum from the first rate tier fetched from API
   - Removed hardcoded minimum values throughout the form

5. **API Integration**
   - Created new corporate verification endpoint: `/api/mtd/verify-corporate`
   - Endpoint calls: `https://products.summitbankng.com/mtd/mtd/verify-corporate`
   - Updated submission payload to include account type and appropriate identifier (BVN/TIN)

### Technical Changes

**Files Modified:**
- `src/components/mtd-application/MTDApplicationForm.tsx`
  - Added `accountType` state management
  - Added `tin` field to form data
  - Updated verification logic to handle both account types
  - Implemented staff ID masking function
  - Updated minimum investment amount to use dynamic values from API

**Files Created:**
- `src/app/api/mtd/verify-corporate/route.ts`
  - New API route for corporate account verification
  - Handles TIN-based verification requests

### User Flow
1. Terms & Conditions → 2. Account Type Selection → 3. Verification (Individual: BVN | Corporate: TIN) → 4. Application Form → 5. Submission

### Acceptance Criteria
- [x] Users can select between Individual and Corporate account types
- [x] Individual accounts use BVN for verification
- [x] Corporate accounts use TIN for verification
- [x] Staff ID is masked in the UI display
- [x] Minimum investment amount is dynamically fetched from rate tiers
- [x] Form validation works correctly for both account types
- [x] Submission includes appropriate identifier based on account type

---

## Comment

### Implementation Details

**Account Type Selection:**
- Added new step `"accountType"` to the application flow
- Users see two options: Individual (👤) and Corporate (🏢)
- Selection is required before proceeding to verification

**Verification Logic:**
- Individual accounts: `/api/mtd/verify` endpoint with `{ accountNumber, bvn }`
- Corporate accounts: `/api/mtd/verify-corporate` endpoint with `{ accountNumber, tin }`
- Auto-verification triggers after 1 second delay when all required fields are filled
- Validation ensures correct format (10-digit account number, 11-digit BVN for individual)

**Staff ID Masking:**
- Implemented `maskStaffId()` function that masks staff IDs for display
- Format: Shows first 4 characters, masks the rest (e.g., "SB250023" → "SB25****")
- Full staff ID still sent to backend in submission payload

**Dynamic Minimum Investment:**
- Removed hardcoded ₦50,000,000 minimum
- Now uses `minimumInvestmentAmount` state populated from first rate tier
- Placeholder and help text dynamically update based on fetched minimum
- Tenor and Effective Date fields disabled until minimum amount is met

**Form Submission:**
- Submission payload now includes:
  - `accountType`: "individual" or "corporate"
  - `bvn`: Only for individual accounts
  - `tin`: Only for corporate accounts
  - All other existing fields remain unchanged

**Error Handling:**
- Improved error messages for DNS/connectivity issues in API routes
- Clear validation messages for account type-specific fields

### Testing Recommendations
1. Test Individual account flow with valid BVN
2. Test Corporate account flow with valid TIN
3. Verify staff ID masking displays correctly
4. Confirm minimum investment amount updates from API
5. Test form validation for both account types
6. Verify submission payload includes correct fields based on account type

### Notes
- Corporate verification endpoint may require VPN/network access to `products.summitbankng.com`
- Staff ID masking is UI-only; backend receives full ID
- Account type selection cannot be changed after verification (user must go back)

---

## Labels
`frontend`, `mtd-application`, `verification`, `corporate-accounts`, `security`, `enhancement`

## Priority
**Medium**

## Story Points
**5**

