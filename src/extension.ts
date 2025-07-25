import * as vscode from 'vscode';
import SnykExtension from './snyk/extension';
import { disposeI18n } from './i18n/i18n';

const extension = new SnykExtension();

export function activate(context: vscode.ExtensionContext): void {
  console.log('Activating SnykExtension');
  void extension.activate(context);
}

export function deactivate(): void {
  console.log('Deactivating SnykExtension');
  disposeI18n();
  void extension.deactivate();
}

export function getExtension(): SnykExtension {
  return extension;
}
