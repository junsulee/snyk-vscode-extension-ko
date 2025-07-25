import { t } from '../../../i18n/i18n';

export const messages = {
  runTest: t('code.scan.run'),
  started: t('code.scan.started'),
  finished: t('code.scan.finished'),
  temporaryFailed: t('code.scan.temporarily.failed'),
  retry: t('code.scan.retry'),

  failed: (requestId: string): string => t('code.scan.failed', { requestId }),
};
