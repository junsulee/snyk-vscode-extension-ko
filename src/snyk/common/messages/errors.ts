import { t } from '../../../i18n/i18n';

export const errorsLogs = {
  loginStatus: t('errors.login.status'),
  filtersFiles: t('errors.filters.files'),
  analyse: t('errors.analyse'),
  failedAnalysis: t('errors.failed.analysis'),
  failedExecution: t('errors.failed.execution'),
  failedExecutionDebounce: t('errors.failed.execution.debounce'),
  undefinedError: t('errors.undefined.error'),
  watchFileBeforeExtendBundle: t('errors.watch.file.before.extend.bundle'),
  updateReviewPositions: t('errors.update.review.positions'),
  errorReportFail: t('errors.error.report.fail'),
  modifiedFile: (type: string): string => t('errors.modified.file', { type }),
  command: (type: string): string => t('errors.command', { type }),
  configWatcher: t('errors.config.watcher'),
  loadingBadge: t('errors.loading.badge'),
  welcomeNotification: t('errors.welcome.notification'),
  checkAdvancedMode: t('errors.check.advanced.mode'),
};
