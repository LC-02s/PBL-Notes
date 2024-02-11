import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from './ui/ui'
import folderReducer from './folder/folder'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    folder: folderReducer,
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
