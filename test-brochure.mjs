// Test script for brochure API
import fetch from 'node-fetch';

const testEmail = 'test@example.com';

console.log('🧪 Testing brochure API...');
console.log('📧 Email:', testEmail);

try {
  const response = await fetch('http://localhost:5173/api/brochure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: testEmail }),
  });

  console.log('\n📊 Response status:', response.status);
  console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));
  
  const data = await response.json();
  console.log('\n📦 Response data:', data);
  
  if (response.ok) {
    console.log('\n✅ SUCCESS: Brochure API is working!');
  } else {
    console.log('\n❌ FAILED: Brochure API returned error');
  }
} catch (error) {
  console.error('\n💥 ERROR:', error.message);
  console.error('Stack:', error.stack);
}
