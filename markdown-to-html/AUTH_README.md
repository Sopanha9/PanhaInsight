# Admin Authentication Setup

This admin panel is now secured with password authentication.

## Setup Instructions

1. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local`
   - Update the credentials in `.env.local`:
     ```bash
     # Use a bcrypt hash (not plain text)
     # Tip: wrap the hash in single quotes or escape $ as \$
     ADMIN_PASSWORD_HASH=your-bcrypt-hash-here
     ADMIN_TOKEN=random-secure-token-here
     ```

2. **Generate secure token (recommended):**

   ```bash
   # Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

   # Or using PowerShell
   -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
   ```

3. **Restart your development server after changing `.env.local`:**
   ```bash
   npm run dev
   ```

## How It Works

- **Middleware Protection:** The middleware checks for authentication on all `/admin/*` routes
- **Login Page:** Access `/admin/login` to authenticate
- **Secure Cookies:** Authentication token is stored in HTTP-only cookies
- **API Protection:** The `/api/posts` endpoint verifies the token before creating posts
- **Session Duration:** Authentication lasts 7 days

## Usage

1. Navigate to `/admin` or `/admin/login`
2. Enter your admin password
3. You'll be redirected to the admin panel
4. Click "Logout" to end your session

## Security Notes

- ⚠️ **Never commit `.env.local`** - it's already in `.gitignore`
- 🔒 Use strong passwords and tokens in production
- 🌐 In production, ensure HTTPS is enabled for secure cookie transmission
- 🔄 Rotate your tokens regularly
