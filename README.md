# note-boi-note-schema

JSON Schema for NoteBoi notes

## Overview

This repository provides a JSON Schema for validating the note format used by the NoteBoi note-taking application. The schema defines the structure for notes with UUID, timestamp, and rich text content using the Quill Delta format.

## Note Format

A NoteBoi note has the following structure:

```json
{
  "uuid": "2cbe0086-4b6f-466f-9ec0-9a302480da6a",
  "timestamp": 958201892455,
  "content": {
    "delta": {
      "ops": [
        {
          "insert": "foo\nbar\n"
        }
      ]
    },
    "title": "foo",
    "body": "bar"
  }
}
```

### Fields

- **uuid** (string, required): Unique identifier in UUID v4 format
- **timestamp** (number, required): Unix timestamp in milliseconds
- **content** (object, required): Content of the note
  - **delta** (object, required): Quill Delta format for rich text
    - **ops** (array, required): Array of Quill Delta operations
  - **title** (string, required): Note title
  - **body** (string, required): Note body text

## Usage

### Validation

To validate a note JSON file:

```bash
npm run validate examples/example-note.json
```

Or directly:

```bash
node validate.js path/to/your/note.json
```

### Testing

Run the test suite to validate example notes:

```bash
npm test
```

## Examples

See the `examples/` directory for sample notes:

- `example-note.json` - Basic note with plain text
- `example-note-rich-text.json` - Note with formatted rich text
- `invalid-note-missing-field.json` - Example of an invalid note (for testing)

## Schema File

The JSON Schema is available in `note-schema.json` and can be used with any JSON Schema validator compliant with draft-07 or later.

## Quill Delta Format

The `content.delta` field uses the [Quill Delta](https://quilljs.com/docs/delta/) format, which is a JSON representation of rich text documents. Each operation in the `ops` array can be:

- **insert**: Add text or embeds
- **delete**: Remove characters
- **retain**: Keep existing content

Operations can include optional `attributes` for formatting (bold, italic, color, etc.).
