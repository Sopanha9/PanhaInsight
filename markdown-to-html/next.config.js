const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Tell Next.js/Turbopack the monorepo root to resolve the correct workspace
  // root when multiple package-lock.json files exist (fixes Vercel 404s)
  outputFileTracingRoot: path.join(__dirname, "../"),
  turbopack: {
    root: path.join(__dirname, "../"),
  },
};
