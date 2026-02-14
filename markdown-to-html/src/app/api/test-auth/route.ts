import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    
    console.log('\n=== Auth Test Debug ===');
    console.log('Received password:', password);
    console.log('Password length:', password?.length);
    console.log('Password chars:', password?.split('').map((c: string, i: number) => `${i}:${c}(${c.charCodeAt(0)})`).join(' '));
    console.log('Hash from env:', adminPasswordHash);
    console.log('Hash length:', adminPasswordHash?.length);
    
    if (!adminPasswordHash) {
      return NextResponse.json({ error: 'Hash not configured' });
    }
    
    const normalizedHash = adminPasswordHash.replace(/\\\$/g, "$");
    console.log('Normalized hash:', normalizedHash);
    console.log('Hash changed:', normalizedHash !== adminPasswordHash);
    
    const isValid = await bcrypt.compare(password, normalizedHash);
    console.log('Comparison result:', isValid);
    
    // Also test with the expected password
    const expectedPassword = 'panhaInsight2026$$$';
    const expectedValid = await bcrypt.compare(expectedPassword, normalizedHash);
    console.log('Expected password test:', expectedValid);
    
    return NextResponse.json({
      received: password,
      receivedLength: password.length,
      hashPrefix: normalizedHash.substring(0, 10),
      isValid,
      expectedPasswordWorks: expectedValid
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
