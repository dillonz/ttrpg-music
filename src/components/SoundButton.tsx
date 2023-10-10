import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@mui/material';
import { Delete, DeleteForever, DriveFileMove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteAudio } from '../redux/actions';
import axios from 'axios';
import store from '../redux/store';
import { updateState } from '../redux/reducers';

interface SoundButtonProps {
  name: string;
  path: string;
  index: number;
  indexPlayingInGroup: number;
  playSpecificAudio: (index: number) => void;
  groupIndex: number;
}

const SoundButton: React.FC<SoundButtonProps> = ({ name, path, index, indexPlayingInGroup, playSpecificAudio, groupIndex }) => {
    let [state, setState] = React.useState({ confirming: false });
    const dispatch = useDispatch();

    const onDeleteClick = (event: any) => {
        event.preventDefault();
        if (state.confirming)
        {        
            axios.post('/delete_audio', { path: store.getState().soundDb[groupIndex].audio[index].path})
            .then((response: any) =>
            {
                if (response.status === 200) {                    
                    dispatch(deleteAudio({ groupIndex: groupIndex, audioIndex: index }));
                    updateState();
                }
            });
        }
        else
        {
            setState({...state, confirming: true})
        }
    }
    return (
        <span
            style={{
                display: 'flex'
            }}
        >
            <Button 
                onClick={() => playSpecificAudio(index)}
                variant="contained"
                color={index === indexPlayingInGroup ? "secondary" : "primary" }
                key={path}
                style={{
                    width: "100%",
                    margin: "5px",
                }}
            >
                {name}
            </Button>
            <IconButton
                onClick={onDeleteClick}
            >
                {state.confirming ? <DeleteForever /> : <Delete />}
            </IconButton>
            <IconButton>
                <DriveFileMove />
            </IconButton>
        </span>
    );
};

export default SoundButton;