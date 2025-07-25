import { t } from '../../../i18n/i18n';

export const messages = {
  scanFailed: t('oss.analysis.scan.failed'),
  noWorkspaceTrust: t('oss.analysis.no.workspace.trust'),
  clickToProblem: t('oss.analysis.click.to.problem'),
  scanRunning: t('oss.scan.running'),
  congratsNoIssuesFound: t('oss.issues.congrats.none.found'),
  congratsNoOpenIssuesFound: t('oss.issues.congrats.no.open.found'),
  openIssuesAreDisabled: t('oss.issues.open.disabled'),
  noIgnoredIssues: t('oss.issues.no.ignored'),
  openAndIgnoredIssuesAreDisabled: t('oss.issues.open.and.ignored.disabled'),
  noFixableIssues: t('oss.issues.no.fixable'),
  allSeverityFiltersDisabled: t('oss.analysis.all.severity.filters.disabled'),
  allIssueViewOptionsDisabled: t('oss.issues.all.view.options.disabled'),
  openIssueViewOptionDisabled: t('oss.issues.open.view.option.disabled'),
  ignoredIssueViewOptionDisabled: t('oss.issues.ignored.view.option.disabled'),
  duration: (time: string, day: string): string => t('oss.analysis.duration', { time, day }),
  noWorkspaceTrustDescription: t('oss.analysis.no.workspace.trust.description'),
};
