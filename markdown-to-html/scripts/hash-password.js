#!/usr/bin/env node
/**
 * Password Hash Generator
 *
 * Usage:
 *   node scripts/hash-password.js your-password-here
 *
 * Or run without arguments to be prompted:
 *   node scripts/hash-password.js
 */

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const readline = require("readline");

const SALT_ROUNDS = 12; // Higher = more secure but slower (10-12 recommended)

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
}

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    // Password provided as argument
    const password = args[0];
    console.log("\n🔐 Generating bcrypt hash...\n");
    const hash = await hashPassword(password);
    const token = generateToken();

    console.log("✅ Add these to your .env.local file:\n");
    console.log("ADMIN_PASSWORD_HASH=" + hash);
    console.log("ADMIN_TOKEN=" + token);
    console.log(
      "\n⚠️  IMPORTANT: Delete the plain-text ADMIN_PASSWORD variable\n",
    );
  } else {
    // Interactive mode
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter password to hash: ", async (password) => {
      if (!password) {
        console.log("❌ Password cannot be empty");
        rl.close();
        return;
      }

      console.log("\n🔐 Generating bcrypt hash...\n");
      const hash = await hashPassword(password);
      const token = generateToken();

      console.log("✅ Add these to your .env.local file:\n");
      console.log("ADMIN_PASSWORD_HASH=" + hash);
      console.log("ADMIN_TOKEN=" + token);
      console.log(
        "\n⚠️  IMPORTANT: Delete the plain-text ADMIN_PASSWORD variable\n",
      );

      rl.close();
    });
  }
}

main().catch(console.error);
