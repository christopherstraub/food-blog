import { useState } from 'react';
import PropTypes from 'prop-types';
import useAppTranslations from '../hooks/use-static-query/use-app-translations';
import CloseIcon from '../icons/close-icon';
import * as styles from './cookie-settings-modal.module.scss';

export default function CookieSettingsModal({
  locale,
  toggleShowCookieSettings,
}) {
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  const disableString = `ga-disable-${process.env.GATSBY_GA_MEASUREMENT_ID}`;

  const [gaDisable, setGaDisable] = useState(
    typeof document !== 'undefined'
      ? document.cookie.indexOf(`${disableString}=true`) >= 0
      : undefined
  );

  function gaOptout() {
    document.cookie = `${disableString}=true;expires=Thu, 31 Dec 2099 23:59:59 UTC;path=/`;
    window[disableString] = true;
    setGaDisable(true);
    setPreferencesSaved(true);
  }
  function gaOptin() {
    document.cookie = `${disableString}=false;expires=Thu, 31 Dec 2099 23:59:59 UTC;path=/`;
    window[disableString] = undefined;
    setGaDisable(false);
    setPreferencesSaved(true);
  }

  const {
    title: tTitle,
    performance: tPerformance,
    performanceDescription: tPerformanceDescription,
    finish: tFinish,
    preferencesSaved: tPreferencesSaved,
  } = useAppTranslations(locale).cookieSettings;

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div>
          <h2>{tTitle}</h2>
          <button type="button" onClick={toggleShowCookieSettings}>
            <CloseIcon locale={locale} />
          </button>
        </div>
        <label htmlFor="analytics">
          <input
            type="checkbox"
            id="analytics"
            checked={!gaDisable}
            onChange={(event) =>
              event.target.checked ? gaOptin() : gaOptout()
            }
          />
          <h3>{tPerformance}</h3>
          <p>{tPerformanceDescription}</p>
        </label>
        <div>
          <button type="button" onClick={toggleShowCookieSettings}>
            {tFinish}
          </button>
          {preferencesSaved && <p>{tPreferencesSaved}</p>}
        </div>
      </div>
      <div />
    </div>
  );
}

CookieSettingsModal.propTypes = {
  locale: PropTypes.string.isRequired,
  toggleShowCookieSettings: PropTypes.func.isRequired,
};
