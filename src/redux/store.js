import { configureStore } from '@reduxjs/toolkit'
import automatorSlice from './automatorSlice.jsx'
import { thunk } from 'redux-thunk';

const initialState = {
    // Initial State
}

const reducer = (state = initialState, action) => {
    // Your reducers go here
}

const store = configureStore({
    reducer: {
      automator: automatorSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  })

export default store