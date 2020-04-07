import produce from 'immer';

export const initialState = {
  loading: false,
  error: false
};

const appReducer = produce((draft, action) => {
  switch (action.type) {
    case 'app/load':
      draft.loading = true;
      draft.error = false;
      break;
    case 'app/load/success':
      draft.loading = false;
      break;
    case 'app/load/error':
      draft.loading = false;
      draft.error = action.error;
      break;
  }
}, initialState);

export default appReducer;