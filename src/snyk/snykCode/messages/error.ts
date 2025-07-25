import { t } from '../../../i18n/i18n';

export const messages = {
  suggestionViewShowFailed: t('code.error.suggestion.view.show.failed'),

  suggestionViewMessageHandlingFailed: (msg: string): string =>
    t('code.error.suggestion.view.message.handling.failed', { message: msg }),
};
