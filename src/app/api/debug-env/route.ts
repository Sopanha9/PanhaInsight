import { NextResponse } from "next/server";

export async function GET() {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  
  console.log('Full hash from env:', hash);
  console.log('Hash bytes:', hash?.split('').map((c, i) => `[${i}]=${c}(${c.charCodeAt(0)})`).slice(0, 20).join(' '));
  
  return NextResponse.json({
    hashExists: !!hash,
    hashLength: hash?.length,
    hashFirst20: hash?.substring(0, 20),
    hashLast20: hash?.substring(hash.length - 20),
    fullHash: hash
  });
}
