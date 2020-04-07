const { addLocaleData } = require('react-intl');
const enLocaleData = require('react-intl/locale-data/en');
const zhLocaleData = require('react-intl/locale-data/zh');
const { DEFAULT_LOCALE } = require('./locales');

const enTranslationMessages = require('./lang/en.json');
const zhTranslationMessages = require('./lang/zh.json');


addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  zh: formatTranslationMessages('zh', zhTranslationMessages),
};

exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
