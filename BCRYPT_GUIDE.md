# 🔐 Bcrypt Password Hashing Guide

## ✅ **What Changed**

Your authentication now uses **bcrypt** instead of plain-text passwords!

### **Before (Vulnerable)**

```env
ADMIN_PASSWORD=panhaInsight2026$$$  # ❌ Stored in plain text
```

### **After (Secure)**

```env
ADMIN_PASSWORD_HASH=$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIWYQI7N4G
```

---

## 🚀 **Quick Start**

### **Step 1: Generate Your Password Hash**

Run the helper script:

```bash
node scripts/hash-password.js
```

You'll be prompted to enter your password:

```
Enter password to hash: YourSecurePassword123!

🔐 Generating bcrypt hash...

✅ Add these to your .env.local file:

ADMIN_PASSWORD_HASH=$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIWYQI7N4G
ADMIN_TOKEN=7f3a9c2e8b5d4f1a6c9e2b8f5d3a7c1e9b2f6d4a8e3c7f1b5d9a2e8c6f4b1d3

⚠️  IMPORTANT: Delete the plain-text ADMIN_PASSWORD variable
```

**Or pass password as argument:**

```bash
node scripts/hash-password.js YourSecurePassword123!
```

### **Step 2: Update .env.local**

Replace the values in your `.env.local`:

```env
ADMIN_PASSWORD_HASH=$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIWYQI7N4G
ADMIN_TOKEN=7f3a9c2e8b5d4f1a6c9e2b8f5d3a7c1e9b2f6d4a8e3c7f1b5d9a2e8c6f4b1d3
```

⚠️ **Delete the old `ADMIN_PASSWORD` variable** - you don't need it anymore!

### **Step 3: Restart Dev Server**

```bash
npm run dev
```

---

## 🔒 **How Bcrypt Works**

### **Hashing Process**

```
Plain Password → Bcrypt Algorithm → Hash
"MyPassword123" → [salt + hash] → "$2a$12$LQv3c1yq..."
```

### **Key Features**

1. **One-Way Function**: Cannot reverse the hash to get the password
2. **Unique Salt**: Each hash is different even for the same password
3. **Adaptive Cost**: Can increase difficulty as computers get faster
4. **Timing-Safe**: Built-in protection against timing attacks

### **Hash Anatomy**

```
$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIWYQI7N4G
│  │ │  └─────────────────────────────────────────────┘
│  │ │                    Hash (31 chars)
│  │ └── Salt (22 chars)
│  └──── Cost Factor (12 = 2^12 iterations)
└─────── Algorithm Version (2a = bcrypt)
```

**Cost Factor Explanation:**

- `10` = 1,024 iterations (fast, less secure)
- `12` = 4,096 iterations (recommended, good balance)
- `14` = 16,384 iterations (slow, very secure)

---

## 🛡️ **Security Improvements**

| Feature          | Before               | After                               |
| ---------------- | -------------------- | ----------------------------------- |
| Password Storage | ❌ Plain text        | ✅ Bcrypt hash                      |
| Database Leak    | ❌ Password exposed  | ✅ Hash useless without brute force |
| Rainbow Tables   | ❌ Vulnerable        | ✅ Unique salt protects             |
| Timing Attacks   | ⚠️ Manual protection | ✅ Built-in protection              |
| Brute Force Cost | ❌ Cheap             | ✅ Expensive (2^12 iterations)      |

---

## 📝 **Comparison with Other Methods**

### **Plain Text** ❌

```javascript
password === "admin123"; // NEVER DO THIS
```

**Risk**: Anyone with access to env vars knows the password

### **SHA-256** ⚠️

```javascript
crypto.createHash("sha256").update(password).digest("hex");
```

**Risk**: Too fast, vulnerable to rainbow tables

### **Bcrypt** ✅ (What we use)

```javascript
await bcrypt.compare(password, hash);
```

**Benefits**: Slow by design, salted, timing-safe

### **Argon2** ✅✅ (Even Better)

```javascript
await argon2.verify(hash, password);
```

**Benefits**: Winner of Password Hashing Competition, modern choice

---

## 🔄 **How Login Works Now**

### **Old Flow (Vulnerable)**

```
User enters password
      ↓
Compare with plain text in .env
      ↓
If match → Allow login
```

### **New Flow (Secure)**

```
User enters password: "MyPassword123"
      ↓
Fetch bcrypt hash from .env: "$2a$12$..."
      ↓
bcrypt.compare("MyPassword123", "$2a$12$...")
      ↓
Bcrypt extracts salt → Hashes input → Compares
      ↓
If match → Allow login
```

**Time per comparison**: ~100-300ms (intentionally slow to prevent brute force)

---

## 💻 **Manual Hash Generation**

If you want to generate a hash manually:

### **Using Node.js REPL**

```javascript
const bcrypt = require("bcryptjs");

// Generate hash
bcrypt.hash("YourPassword123!", 12).then((hash) => {
  console.log("ADMIN_PASSWORD_HASH=" + hash);
});
```

### **Using Command Line**

```bash
node -e "require('bcryptjs').hash('YourPassword123!', 12).then(h => console.log('ADMIN_PASSWORD_HASH=' + h))"
```

---

## 🔐 **Production Deployment**

### **Vercel**

1. Go to Project Settings → Environment Variables
2. Add `ADMIN_PASSWORD_HASH` with your bcrypt hash
3. Add `ADMIN_TOKEN` with random 64-char hex
4. Deploy

### **Railway / Render / Netlify**

Same process - add env vars in dashboard

### **⚠️ Important**

- Never hardcode hashes in code
- Use different hashes for dev/staging/production
- Rotate passwords every 90 days

---

## 🧪 **Testing**

Verify your hash works:

```javascript
const bcrypt = require("bcryptjs");

const password = "YourPassword123!";
const hash = "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIWYQI7N4G";

bcrypt.compare(password, hash).then((isValid) => {
  console.log("Password valid:", isValid); // Should be true
});
```

---

## 🔄 **Changing Your Password**

1. Run: `node scripts/hash-password.js NewPassword456!`
2. Copy new `ADMIN_PASSWORD_HASH` to `.env.local`
3. Restart server
4. Old sessions remain valid (token unchanged)

**To invalidate all sessions**: Also generate new `ADMIN_TOKEN`

---

## ❓ **FAQ**

### **Can I recover my password from the hash?**

No! That's the point. If you forget it, generate a new hash.

### **Why is bcrypt so slow?**

Intentional. Makes brute force attacks expensive.

### **Can two users have the same password with different hashes?**

Yes! Each hash has a unique random salt.

### **Should I increase cost factor beyond 12?**

For admin panels with low traffic, 12 is fine. For high-security: use 14.

### **What if I leak my .env.local file?**

Still bad (token exposed), but attacker can't reverse engineer your password.

---

## 🎯 **Security Score**

| Metric                   | Score      |
| ------------------------ | ---------- |
| Password Storage         | ⭐⭐⭐⭐⭐ |
| Brute Force Resistance   | ⭐⭐⭐⭐⭐ |
| Rainbow Table Resistance | ⭐⭐⭐⭐⭐ |
| Timing Attack Resistance | ⭐⭐⭐⭐⭐ |
| Database Leak Protection | ⭐⭐⭐⭐⭐ |

**Overall**: Production-ready for most applications! 🎉
