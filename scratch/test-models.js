const https = require('https');

const login = process.argv[2];
const password = process.argv[3];
const platform = process.argv[4] || 'gemini';

if (!login || !password) {
  console.error("Usage: node test-models.js <login> <password> <platform>");
  process.exit(1);
}

const auth = Buffer.from(`${login}:${password}`).toString('base64');

const options = {
  hostname: 'api.dataforseo.com',
  path: `/v3/ai_optimization/${platform}/llm_responses/models`,
  method: 'GET',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Platform: ${platform}`);
    console.log(data);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
