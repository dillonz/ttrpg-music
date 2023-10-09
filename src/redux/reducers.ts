import { combineReducers } from 'redux';
import { AppState, AudioGroupData } from '../App';
import soundDb from '../sound-db.json'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { MOVE_AUDIO } from './actions';

const initialState: AppState = {
    soundDb: soundDb as AudioGroupData[],
    groupPlayingIx: -1
}

const moveAudio = createAction(MOVE_AUDIO);

export const RootReducer = createReducer<AppState>(initialState, (builder) => {
    // Implement your reducer logic here
    builder
    .addCase(moveAudio, (state, action) => {
        return state;
    })
});