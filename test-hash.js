const bcrypt = require('bcryptjs');

const password = 'panhaInsight2026$$$';
const hash = '$2b$12$hIkjvyCAQXv2JTNfrpSMRenNWOJ8hfqV2r1nrmIYNf/JI3QFiuSRe';

console.log('Testing password:', password);
console.log('Against hash:', hash);

bcrypt.compare(password, hash).then(result => {
  console.log('Match result:', result);
  
  if (!result) {
    console.log('\n❌ Hash does NOT match. Generating correct hash...');
    return bcrypt.hash(password, 12).then(newHash => {
      console.log('\n✅ Use this hash in .env.local:');
      console.log('ADMIN_PASSWORD_HASH=' + newHash);
    });
  } else {
    console.log('\n✅ Hash is correct!');
  }
}).catch(console.error);
