import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from './actions/ui'
import folderReducer from './actions/folder'
import noteReducer from './actions/note'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    folder: folderReducer,
    note: noteReducer,
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
