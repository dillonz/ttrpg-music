import { createStore } from 'redux';
import { RootReducer, initialState } from './reducers'; // You'll create this next
import { configureStore } from '@reduxjs/toolkit'
import { AppState, AudioGroupData } from '../App';
import type { Reducer } from '@reduxjs/toolkit'
   
const store = configureStore<AppState>({ 
    reducer: RootReducer,
    devTools: process.env.NODE_ENV !== 'production',  
    preloadedState: initialState 
});

export default store;