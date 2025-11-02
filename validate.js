#!/usr/bin/env node

import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load schema
const schema = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'note-schema.json'), 'utf8')
);

// Create validator
const ajv = new Ajv();
const validate = ajv.compile(schema);

// Get file path from command line argument
const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node validate.js <path-to-json-file>');
  console.log('\nExample:');
  console.log('  node validate.js examples/example-note.json');
  process.exit(1);
}

// Load and validate file
try {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const valid = validate(data);

  if (valid) {
    console.log('✓ Valid NoteBoi note');
    process.exit(0);
  } else {
    console.error('✗ Invalid NoteBoi note:');
    console.error(JSON.stringify(validate.errors, null, 2));
    process.exit(1);
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
