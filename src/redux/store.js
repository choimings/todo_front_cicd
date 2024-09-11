import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReducer from './slices/ModalSlice';
import apiReducer from './slices/apiSlice';

const store = configureStore({
  // 5. store에 slice 등록
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    api: apiReducer,
  },
});

export default store;
