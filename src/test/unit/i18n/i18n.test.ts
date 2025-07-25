import { expect } from 'chai';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import { i18n, t } from '../../../i18n/i18n';

suite('I18n Tests', () => {
  let sandbox: sinon.SinonSandbox;
  let getConfigurationStub: sinon.SinonStub;
  let envLanguageStub: sinon.SinonStub;

  setup(() => {
    sandbox = sinon.createSandbox();
    getConfigurationStub = sandbox.stub(vscode.workspace, 'getConfiguration');
    envLanguageStub = sandbox.stub(vscode.env, 'language');
  });

  teardown(() => {
    sandbox.restore();
  });

  test('should use Korean when forceKoreanLanguage is true', () => {
    // Mock configuration to return true for forceKoreanLanguage
    const configMock = {
      get: sandbox.stub().returns(true)
    };
    getConfigurationStub.withArgs('snyk').returns(configMock);
    
    // Mock English environment
    envLanguageStub.value('en-US');

    // Create new i18n instance to test
    const currentLanguage = i18n.getCurrentLanguage();
    
    expect(currentLanguage).to.equal('ko');
  });

  test('should use IDE language when forceKoreanLanguage is false', () => {
    // Mock configuration to return false for forceKoreanLanguage
    const configMock = {
      get: sandbox.stub().returns(false)
    };
    getConfigurationStub.withArgs('snyk').returns(configMock);
    
    // Mock Korean environment
    envLanguageStub.value('ko-KR');

    const currentLanguage = i18n.getCurrentLanguage();
    
    expect(currentLanguage).to.equal('ko');
  });

  test('should fallback to English when forceKoreanLanguage is false and IDE is English', () => {
    // Mock configuration to return false for forceKoreanLanguage
    const configMock = {
      get: sandbox.stub().returns(false)
    };
    getConfigurationStub.withArgs('snyk').returns(configMock);
    
    // Mock English environment
    envLanguageStub.value('en-US');

    const currentLanguage = i18n.getCurrentLanguage();
    
    expect(currentLanguage).to.equal('en');
  });

  test('should return translated message', () => {
    // This test assumes there are some test messages in the JSON files
    const message = t('test.message.key');
    expect(message).to.be.a('string');
  });
});