import { combineReducers } from 'redux';
import { AppState, AudioData, AudioGroupData } from '../App';
import { createAction, createReducer } from '@reduxjs/toolkit'
import { ADD_AUDIO, AddAudioPL, CREATE_GROUP, CreateGroupPL, DELETE_AUDIO, DELETE_GROUP, DeleteAudioPL, DeleteGroupPL, EDIT_GROUP, EditGroupPL, LOAD_STATE, MOVE_AUDIO, MoveAudioPL, PLAY_GROUP } from './actions';
import axios from 'axios';
import store from './store';

export let initialState: AppState = {
    soundDb: [],
    isLoaded: false,
    groupPlayingIx: -1
}

const loadState = createAction<AudioGroupData[]>(LOAD_STATE);
const moveAudio = createAction<MoveAudioPL>(MOVE_AUDIO);
const playGroup = createAction<number>(PLAY_GROUP);
const deleteAudio = createAction<DeleteAudioPL>(DELETE_AUDIO);
const addAudio = createAction<AddAudioPL>(ADD_AUDIO);
const deleteGroup = createAction<DeleteGroupPL>(DELETE_GROUP);
const createGroup = createAction<CreateGroupPL>(CREATE_GROUP);
const editGroup = createAction<EditGroupPL>(EDIT_GROUP);

export const updateState = (db: AudioGroupData[]) => {
    axios.post('/save_state', db);
}

export const RootReducer = createReducer<AppState>(initialState, (builder) => {
    // Implement your reducer logic here
    builder
    .addCase(loadState, (state, action) => {
        state.soundDb = action.payload;
        state.isLoaded = true;
    })
    .addCase(moveAudio, (state, action) => {
        const { groupIndex, audioIndex, newGroupIndex } = action.payload;
        const db = state.soundDb as AudioGroupData[];
        const audioObj = db[groupIndex].audio[audioIndex];
        db[newGroupIndex].audio.push(audioObj);
        db[groupIndex].audio.splice(audioIndex, 1);
        updateState(db);
    })
    .addCase(playGroup, (state, action) => {
        return { ...state, groupPlayingIx: action.payload };
    })
    .addCase(deleteAudio, (state, action) => {
        const { groupIndex, audioIndex } = action.payload;
        const db = state.soundDb;
        db[groupIndex].audio.splice(audioIndex,1);
        updateState(db);
    })
    .addCase(addAudio, (state, action) => {
        const { groupIndex, audioName, audioPath } = action.payload;
        const db = state.soundDb as AudioGroupData[];

        db[groupIndex].audio.push({ name: audioName, path: audioPath });
        updateState(db);
    })
    .addCase(deleteGroup, (state, action) => {
        const { groupIndex } = action.payload;
        const db = state.soundDb as AudioGroupData[];
        for (let i = 0; i < state.soundDb[groupIndex].audio.length; i++)
        {
            axios.post('/delete_audio', { path: db[groupIndex].audio[i].path })
        }
        db.splice(groupIndex, 1);
        updateState(db);
    })
    .addCase(createGroup, (state, action) => {
        const { groupName, bgColor } = action.payload;
        const db = state.soundDb as AudioGroupData[];
        db.push({ groupName: groupName, bgColor: bgColor, audio: [] })
        updateState(db);
    })
    .addCase(editGroup, (state, action) => {
        const { groupName, bgColor, groupIndex } = action.payload;
        const db = state.soundDb as AudioGroupData[];
        db[groupIndex].bgColor = bgColor;
        db[groupIndex].groupName = groupName;
        updateState(db);
    })
});