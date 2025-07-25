import * as vscode from 'vscode';

// Import message files
const ossEnMessages = require('./oss.en.json');
const ossKoMessages = require('./oss.ko.json');

type MessageKey = string;
type MessageValue = string;
type Messages = Record<MessageKey, MessageValue>;

interface I18nConfig {
  en: Messages;
  ko: Messages;
}

class I18n {
  private currentLanguage: string;
  private messages: I18nConfig;
  private configurationWatcher: vscode.Disposable | undefined;

  constructor() {
    this.currentLanguage = this.getLanguage();
    this.messages = {
      en: ossEnMessages,
      ko: ossKoMessages,
    };
    
    // 설정 변경 감지
    this.setupConfigurationWatcher();
  }

  private setupConfigurationWatcher(): void {
    this.configurationWatcher = vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('snyk.forceKoreanLanguage')) {
        const newLanguage = this.getLanguage();
        if (newLanguage !== this.currentLanguage) {
          this.currentLanguage = newLanguage;
        }
      }
    });
  }

  /**
   * Dispose resources
   */
  public dispose(): void {
    if (this.configurationWatcher) {
      this.configurationWatcher.dispose();
    }
  }

  private getLanguage(): string {
    // 사용자가 강제 한국어 설정을 활성화한 경우
    const forceKorean = vscode.workspace.getConfiguration('snyk').get('forceKoreanLanguage', false);
    if (forceKorean) {
      return 'ko';
    }
    
    // 기존 로직: IDE 언어 설정 확인
    const lang = vscode.env.language;
    // Support Korean and fallback to English
    if (lang.startsWith('ko')) {
      return 'ko';
    }
    return 'en';
  }

  /**
   * Get translated message by key
   * @param key Message key (e.g., "oss.scan.complete")
   * @param params Optional parameters to replace in message template
   * @returns Translated message
   */
  public t(key: MessageKey, params?: Record<string, string | number>): string {
    const messages = this.messages[this.currentLanguage as keyof I18nConfig] || this.messages.en;
    let message = messages[key];

    if (!message) {
      // Fallback to English if key not found in current language
      message = this.messages.en[key];
      if (!message) {
        console.warn(`Missing translation key: ${key}`);
        return key; // Return the key itself as fallback
      }
    }

    // Replace template parameters if provided
    if (params) {
      Object.keys(params).forEach(paramKey => {
        const placeholder = `{${paramKey}}`;
        message = message.replace(new RegExp(placeholder, 'g'), String(params[paramKey]));
      });
    }

    return message;
  }

  /**
   * Change language dynamically (for testing or future use)
   */
  public setLanguage(language: string): void {
    this.currentLanguage = language;
  }

  /**
   * Get current language
   */
  public getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}

// Create singleton instance
const i18nInstance = new I18n();

/**
 * Translation function - main export for use throughout the codebase
 * @param key Message key
 * @param params Optional parameters for template replacement
 * @returns Translated message
 */
export function t(key: MessageKey, params?: Record<string, string | number>): string {
  return i18nInstance.t(key, params);
}

/**
 * Dispose i18n resources
 */
export function disposeI18n(): void {
  i18nInstance.dispose();
}

export { i18nInstance as i18n };