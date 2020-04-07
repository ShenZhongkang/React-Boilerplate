import produce from 'immer';
import { DEFAULT_LOCALE } from '../../translations/locales';

export const initialState = {
  locale: DEFAULT_LOCALE
};

const languageProviderReducer = produce((draft, action) => {
  switch (action.type) {
    case 'lang/change-locale':
      draft.locale = action.locale;
      break;
  }
}, initialState);

export default languageProviderReducer;
