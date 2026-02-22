require('dotenv').config({ path: '.env.local' });

console.log('=== Environment Variables Debug ===');
console.log('ADMIN_PASSWORD_HASH exists:', !!process.env.ADMIN_PASSWORD_HASH);
console.log('ADMIN_PASSWORD_HASH length:', process.env.ADMIN_PASSWORD_HASH?.length);
console.log('ADMIN_PASSWORD_HASH value:', process.env.ADMIN_PASSWORD_HASH);
console.log('ADMIN_TOKEN exists:', !!process.env.ADMIN_TOKEN);

const bcrypt = require('bcryptjs');
const testPassword = 'panhaInsight2026$$$';

console.log('\n=== Testing Password ===');
console.log('Test password:', testPassword);

if (process.env.ADMIN_PASSWORD_HASH) {
  // Test with normalization (like the route does)
  const normalizedHash = process.env.ADMIN_PASSWORD_HASH.replace(/\\\$/g, '$');
  console.log('Normalized hash:', normalizedHash);
  console.log('Hash changed after normalization:', normalizedHash !== process.env.ADMIN_PASSWORD_HASH);
  
  bcrypt.compare(testPassword, normalizedHash).then(result => {
    console.log('\n✅ Password match result:', result);
    
    if (!result) {
      console.log('\n❌ Password does not match!');
      console.log('Generating correct hash...');
      return bcrypt.hash(testPassword, 12).then(hash => {
        console.log('\nUse this hash:');
        console.log('ADMIN_PASSWORD_HASH=' + hash);
      });
    }
  }).catch(err => {
    console.error('Error comparing:', err);
  });
} else {
  console.log('❌ ADMIN_PASSWORD_HASH not found in .env.local');
}
