import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import navbarReducer from '../features/navbar/navbarSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    navbar: navbarReducer,
  },
});

export default store; // Ensure you're exporting store as default
