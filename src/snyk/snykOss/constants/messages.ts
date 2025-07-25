import { t } from '../../../i18n/i18n';

export const messages = {
  analysis: {
    scanFailed: t('oss.analysis.scan.failed'),
    noWorkspaceTrust: t('oss.analysis.no.workspace.trust'),
    clickToProblem: t('oss.analysis.click.to.problem'),
    scanRunning: t('oss.scan.running'),
    allSeverityFiltersDisabled: t('oss.analysis.all.severity.filters.disabled'),
    duration: (time: string, day: string): string => t('oss.analysis.duration', { time, day }),
    noWorkspaceTrustDescription: t('oss.analysis.no.workspace.trust.description'),
  },
  errors: {
    suggestionViewShowFailed: t('oss.error.suggestion.view.show.failed'),
  },
  test: {
    testFailed: t('oss.scan.failed'),
    testStarted: t('oss.scan.started'),
    viewResults: t('oss.test.view.results'),
    hide: t('oss.test.hide'),
    testFailedForPath: (path: string): string => t('oss.scan.failed.path', { path }),
    testFinished: (projectName: string): string => t('oss.scan.finished', { projectName }),
  },
  treeView: {
    cookingDependencies: t('oss.cooking.dependencies'),
    runTest: t('oss.test.run'),
  },
};
