import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from './actions/ui'
import folderReducer from './actions/folder'
import memoReducer from './actions/memo'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    folder: folderReducer,
    memo: memoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
