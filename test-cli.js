// Simple test script to verify CLI works
const { spawn } = require('child_process');
const path = require('path');

const cliPath = path.join(__dirname, 'dist', 'cli.js');

console.log('Testing Miahui CLI...\n');

// Test list command
const list = spawn('node', [cliPath, 'list'], {
  cwd: path.join(__dirname, '..', 'miahui-test'),
  stdio: 'inherit'
});

list.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ CLI test passed!');
  } else {
    console.log(`\n❌ CLI test failed with code ${code}`);
    process.exit(1);
  }
});

