import get from 'lodash/get';
import {Release} from '@sentry/release-parser';

import {t, tn} from 'app/locale';
import {CommitAuthor, User} from 'app/types';

export function userDisplayName(user: User | CommitAuthor, includeEmail = true): string {
  let displayName = String(get(user, 'name', t('Unknown author'))).trim();

  if (displayName.length <= 0) {
    displayName = t('Unknown author');
  }

  const email = String(get(user, 'email', '')).trim();

  if (email.length > 0 && email !== displayName && includeEmail) {
    displayName += ' (' + email + ')';
  }
  return displayName;
}

export const formatVersion = (rawVersion: string, withPackage = false) => {
  try {
    const parsedVersion = new Release(rawVersion);
    const versionToDisplay = parsedVersion.describe();

    if (versionToDisplay.length) {
      return `${versionToDisplay}${
        withPackage && parsedVersion.package ? `, ${parsedVersion.package}` : ''
      }`;
    }

    return rawVersion;
  } catch {
    return rawVersion;
  }
};

function roundWithFixed(
  value: number,
  fixedDigits: number
): {label: string; result: number} {
  const label = value.toFixed(fixedDigits);
  const result = fixedDigits <= 0 ? Math.round(value) : value;

  return {label, result};
}

// in milliseconds
const WEEK = 604800000;
const DAY = 86400000;
const HOUR = 3600000;
const MINUTE = 60000;
const SECOND = 1000;

export function getDuration(
  seconds: number,
  fixedDigits: number = 0,
  abbreviation: boolean = false
): string {
  const value = Math.abs(seconds * 1000);

  if (value >= WEEK) {
    const {label, result} = roundWithFixed(value / WEEK, fixedDigits);
    return `${label} ${abbreviation ? t('wk') : tn('week', 'weeks', result)}`;
  }
  if (value >= 172800000) {
    const {label, result} = roundWithFixed(value / DAY, fixedDigits);
    return `${label} ${abbreviation ? t('d') : tn('day', 'days', result)}`;
  }
  if (value >= 7200000) {
    const {label, result} = roundWithFixed(value / HOUR, fixedDigits);
    return `${label} ${abbreviation ? t('hr') : tn('hour', 'hours', result)}`;
  }
  if (value >= 120000) {
    const {label, result} = roundWithFixed(value / MINUTE, fixedDigits);
    return `${label} ${abbreviation ? t('min') : tn('minute', 'minutes', result)}`;
  }
  if (value >= SECOND) {
    const {label, result} = roundWithFixed(value / SECOND, fixedDigits);
    return `${label} ${abbreviation ? t('s') : tn('second', 'seconds', result)}`;
  }

  const {label} = roundWithFixed(value, fixedDigits);

  return label + t('ms');
}

export function getExactDuration(seconds: number, abbreviation: boolean = false) {
  const convertDuration = (secs: number, abbr: boolean) => {
    const value = Math.abs(secs * 1000);

    const divideBy = (time: number) => {
      return {quotient: Math.floor(value / time), remainder: value % time};
    };

    if (value >= WEEK) {
      const {quotient, remainder} = divideBy(WEEK);

      return `${quotient}${
        abbr ? t('wk') : ` ${tn('week', 'weeks', quotient)}`
      } ${convertDuration(remainder / 1000, abbr)}`;
    }
    if (value >= DAY) {
      const {quotient, remainder} = divideBy(DAY);

      return `${quotient}${
        abbr ? t('d') : ` ${tn('day', 'days', quotient)}`
      } ${convertDuration(remainder / 1000, abbr)}`;
    }
    if (value >= HOUR) {
      const {quotient, remainder} = divideBy(HOUR);

      return `${quotient}${
        abbr ? t('hr') : ` ${tn('hour', 'hours', quotient)}`
      } ${convertDuration(remainder / 1000, abbr)}`;
    }
    if (value >= MINUTE) {
      const {quotient, remainder} = divideBy(MINUTE);

      return `${quotient}${
        abbr ? t('min') : ` ${tn('minute', 'minutes', quotient)}`
      } ${convertDuration(remainder / 1000, abbr)}`;
    }
    if (value >= SECOND) {
      const {quotient, remainder} = divideBy(SECOND);

      return `${quotient}${
        abbr ? t('s') : ` ${tn('second', 'seconds', quotient)}`
      } ${convertDuration(remainder / 1000, abbr)}`;
    }

    if (value === 0) {
      return '';
    }

    return `${value}${abbr ? t('ms') : ` ${tn('millisecond', 'milliseconds', value)}`}`;
  };

  const result = convertDuration(seconds, abbreviation).trim();

  if (result.length) {
    return result;
  }

  return `0${abbreviation ? t('ms') : ` ${t('milliseconds')}`}`;
}
