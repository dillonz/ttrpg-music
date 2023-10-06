import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@mui/material';
import { Delete, DeleteForever, DriveFileMove } from '@mui/icons-material';

interface SoundButtonProps {
  name: string;
  path: string;
  index: number;
  indexPlayingInGroup: number;
  playSpecificAudio: (index: number) => void; 
}

const SoundButton: React.FC<SoundButtonProps> = ({ name, path, index, indexPlayingInGroup, playSpecificAudio }) => {
    let [state, setState] = React.useState({ confirming: false });

    const onDeleteClick = () => {
        if (state.confirming)
        {
            //Delete
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