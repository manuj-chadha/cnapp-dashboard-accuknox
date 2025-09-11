import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../slices/dashboardSlice';

const localStorageMiddleware = store => next => action => {
  const result = next(action);
  localStorage.setItem('dashboardState', JSON.stringify(store.getState().dashboard));
  return result;
};

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});