# Snyk VS Code Extension Internationalization (i18n)

This directory contains the internationalization system for the Snyk VS Code extension, enabling Korean localization support.

## Files

- `i18n.ts` - Main i18n system with translation function
- `oss.en.json` - English message translations
- `oss.ko.json` - Korean message translations

## Usage

### Basic Translation

```typescript
import { t } from '../i18n/i18n';

// Simple message
const message = t('oss.welcome.message');

// Message with parameters
const scanResult = t('oss.scan.finished', { projectName: 'my-project' });
```

### Language Detection

The system automatically detects the VS Code language using `vscode.env.language`:
- Korean (`ko-*`) → Uses Korean translations
- All others → Uses English translations (default)

### Parameter Substitution

Messages can include parameters using `{paramName}` syntax:

```json
{
  "oss.analysis.duration": "Analysis finished at {time}, {day}"
}
```

```typescript
t('oss.analysis.duration', { time: '10:30', day: 'Monday' });
// Result: "Analysis finished at 10:30, Monday"
```

## Message Key Structure

Keys follow a hierarchical naming convention:

- `oss.*` - Open Source Security related messages
- `code.*` - Snyk Code related messages  
- `iac.*` - Infrastructure as Code related messages
- `general.*` - General application messages
- `errors.*` - Error messages
- `commands.*` - Command-related messages
- `codeaction.*` - Code action messages
- `configuration.*` - Configuration messages
- `learn.*` - Learning/documentation messages
- `severity.*` - Severity level labels

## Examples

### Notification Messages
```typescript
// Before
vscode.window.showInformationMessage("Scan complete");

// After  
vscode.window.showInformationMessage(t("oss.scan.complete"));
```

### Dynamic Content
```typescript
// Before
const text = `${count} open issue${count === 1 ? '' : 's'}`;

// After
const text = t('oss.issues.open.count', { 
  count: count, 
  s: count === 1 ? '' : 's' 
});
```

### Error Messages
```typescript
// Before
this.logger.warn(`Failed to find the issue ${id}.`);

// After
this.logger.warn(t('commands.failed.to.find.issue', { id }));
```

## Translation Coverage

The i18n system covers:

✅ Welcome messages and notifications  
✅ Scan status and progress messages  
✅ Issue count and status displays  
✅ Error messages and logging  
✅ Code action labels  
✅ Configuration dialogs  
✅ Severity indicators  
✅ Command feedback messages  

## Adding New Messages

1. Add the key to both `oss.en.json` and `oss.ko.json`
2. Use the `t()` function in your code
3. Include parameter placeholders if needed: `{paramName}`

Example:
```json
// oss.en.json
{
  "my.new.message": "Hello {name}, you have {count} items"
}

// oss.ko.json  
{
  "my.new.message": "안녕하세요 {name}님, {count}개의 항목이 있습니다"
}
```

```typescript
// Usage
t('my.new.message', { name: 'User', count: 5 });
```

## Fallback Behavior

- If a key is missing in the current language, falls back to English
- If key is missing entirely, returns the key itself and logs a warning
- Parameters are safely substituted even if translation is missing

## Technical Implementation

The i18n system:
- Uses VS Code's `vscode.env.language` for automatic language detection
- Loads JSON files at runtime using `require()`
- Provides parameter substitution with regex replacement
- Implements singleton pattern for consistent state
- Supports dynamic language switching (for testing)

## Korean Translation Notes

Korean translations maintain:
- Formal/polite speech levels (존댓말)
- Appropriate technical terminology
- Consistent UI conventions
- Proper handling of pluralization (Korean doesn't use 's' suffix)