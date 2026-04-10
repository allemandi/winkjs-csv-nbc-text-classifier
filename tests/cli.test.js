const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { writeFile, readFile, unlink } = require('fs/promises');
const obfuscateCsvComments = require('../commands/obfuscate-csv-comments');

test('obfuscate-csv-comments command integration', async () => {
  const inputPath = path.join(__dirname, 'test-input.csv');
  const outputPath = path.join(__dirname, 'test-output.csv');

  // Prepare input CSV
  const csvContent = 'comment\n"Hello test@example.com"\n"Visit http://example.com"';
  await writeFile(inputPath, csvContent, 'utf8');

  try {
    // Run the command function
    await obfuscateCsvComments(inputPath, outputPath);

    // Verify output file exists
    assert.ok(fs.existsSync(outputPath), 'Output file should be created');

    // Verify content
    const outputContent = await readFile(outputPath, 'utf8');
    assert.ok(outputContent.includes('EMAIL'), 'Output should contain obfuscated email');
    assert.ok(outputContent.includes('URL'), 'Output should contain obfuscated URL');
    assert.ok(outputContent.includes('comment'), 'Output should contain header');

  } finally {
    // Cleanup
    if (fs.existsSync(inputPath)) await unlink(inputPath);
    if (fs.existsSync(outputPath)) await unlink(outputPath);
  }
});
