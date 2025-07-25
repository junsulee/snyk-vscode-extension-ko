# Snyk VS Code 확장의 다국어(i18n) 지원

이 디렉터리는 Snyk VS Code 확장에서 한국어 UI 메시지를 지원하기 위한 국제화(i18n) 시스템을 담고 있습니다.

## 구성 파일

- `i18n.ts` – 메시지 번역 함수가 포함된 i18n 핵심 모듈  
- `oss.en.json` – 영어 메시지 정의  
- `oss.ko.json` – 한국어 메시지 정의  

## 사용 방법

### 기본 사용

```ts
import { t } from '../i18n/i18n';

// 단순 메시지
const message = t('oss.welcome.message');

// 파라미터 포함 메시지
const scanResult = t('oss.scan.finished', { projectName: 'my-project' });
```

### 언어 자동 감지

`vscode.env.language` 값을 기준으로 자동으로 언어를 선택합니다:

- `ko-*` → 한국어 메시지 사용  
- 그 외 → 영어 메시지 사용 (기본값)

### 파라미터 치환

메시지 문자열에 `{paramName}` 형식으로 동적 값을 넣을 수 있습니다.

```json
{
  "oss.analysis.duration": "{day} {time} 기준으로 분석이 완료되었습니다"
}
```

```ts
t('oss.analysis.duration', { time: '10:30', day: '월요일' });
// 출력: "월요일 10:30 기준으로 분석이 완료되었습니다"
```

## 메시지 키 구조

키는 기능 영역에 따라 다음과 같이 구성됩니다:

- `oss.*` – 오픈소스 보안 관련  
- `code.*` – Snyk Code 관련  
- `iac.*` – 인프라(IaC) 관련  
- `general.*` – 일반 메시지  
- `errors.*` – 에러 메시지  
- `commands.*` – 명령어 관련  
- `codeaction.*` – 코드 액션 메시지  
- `configuration.*` – 설정 관련  
- `learn.*` – 문서 및 학습 가이드  
- `severity.*` – 취약점 심각도 레이블

## 사용 예시

### 알림 메시지

```ts
// 기존
vscode.window.showInformationMessage("Scan complete");

// 변경 후
vscode.window.showInformationMessage(t("oss.scan.complete"));
```

### 동적 메시지 구성

```ts
// 기존
const text = `${count} open issue${count === 1 ? '' : 's'}`;

// 변경 후
const text = t('oss.issues.open.count', {
  count: count,
  s: count === 1 ? '' : 's'
});
```

### 에러 메시지

```ts
// 기존
this.logger.warn(`Failed to find the issue ${id}.`);

// 변경 후
this.logger.warn(t('commands.failed.to.find.issue', { id }));
```

## 지원 범위

다국어 시스템은 다음 영역의 메시지를 지원합니다:

- 시작 및 환영 메시지  
- 스캔 상태 및 진행 메시지  
- 이슈 개수 및 상태 출력  
- 에러 및 경고 로그  
- 코드 액션 관련 UI  
- 설정 화면 메시지  
- 심각도 표시  
- 명령 실행 결과 안내

## 새 메시지 추가 방법

1. `oss.en.json`과 `oss.ko.json`에 키 추가  
2. 코드에서 `t()` 함수로 해당 키 사용  
3. 필요한 경우 `{paramName}` 형식으로 변수 정의

```json
// oss.en.json
{
  "my.new.message": "Hello {name}, you have {count} items"
}

// oss.ko.json
{
  "my.new.message": "{name}님, {count}개의 항목이 있습니다"
}
```

```ts
// 사용 예시
t('my.new.message', { name: '사용자', count: 5 });
```

## 예외 처리 및 폴백 동작

- 현재 언어에서 키가 없을 경우 자동으로 영어 메시지를 사용합니다.  
- 키 자체가 없을 경우 키 문자열 그대로 반환되며 로그에 경고가 출력됩니다.  
- 치환 파라미터는 번역이 없더라도 안전하게 처리됩니다.

## 기술적 구성

- `vscode.env.language`로 언어 자동 감지  
- 메시지 파일(JSON)은 런타임 시 `require()`로 로딩  
- `{param}` 형식의 문자열을 정규식으로 치환  
- 싱글톤 구조로 일관된 상태 유지  
- 테스트를 위한 언어 전환도 가능

## 한국어 번역 가이드

- 모든 메시지는 존댓말로 구성되어 있습니다.  
- 기술 용어는 의미를 해치지 않도록 신중하게 번역했습니다.  
- VS Code 기본 UI 스타일과 일관되도록 표현을 맞췄습니다.  
- 영어에서 흔히 쓰이는 복수형 `s` 접미사는 한국어 문맥에 맞게 자연스럽게 표현했습니다.

---

이 문서는 한국어 번역 메시지를 작성하거나 유지보수하는 개발자에게 가이드 역할을 합니다.
by jslee@opensource.or.kr
