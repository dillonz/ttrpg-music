import { createStore } from 'redux';
import { RootReducer } from './reducers'; // You'll create this next
import { configureStore } from '@reduxjs/toolkit'
import soundDb from '../no_reload/sound-db.json'
import { AppState, AudioGroupData } from '../App';
import type { Reducer } from '@reduxjs/toolkit'

const init: AppState = {
    soundDb: soundDb as AudioGroupData[],
    groupPlayingIx: -1
}
   
const store = configureStore<AppState>({ 
    reducer: RootReducer,
    devTools: process.env.NODE_ENV !== 'production',  
    preloadedState: init 
});

export default store;