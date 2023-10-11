import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@mui/material';
import { Delete, DeleteForever, DriveFileMove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteAudio, moveAudio } from '../redux/actions';
import axios from 'axios';
import store from '../redux/store';
import { updateState } from '../redux/reducers';
import SelectGroupModal from './SelectGroupModal';

interface SoundButtonProps {
  name: string;
  path: string;
  index: number;
  indexPlayingInGroup: number;
  playSpecificAudio: (index: number) => void;
  groupIndex: number;
}

const SoundButton: React.FC<SoundButtonProps> = ({ name, path, index, indexPlayingInGroup, playSpecificAudio, groupIndex }) => {
    let [confirmingDelete, setConfirmingDelete] = React.useState(false);
    let [showGroupModal, setShowGroupModal] = React.useState(false);
    const dispatch = useDispatch();

    const onSendToGroup = (newGroupIndex: number) => {
        dispatch(moveAudio({ groupIndex: groupIndex, audioIndex: index, newGroupIndex: newGroupIndex }))
    }

    const onDeleteClick = (event: any) => {
        event.preventDefault();
        if (confirmingDelete)
        {        
            axios.post('/delete_audio', { path: store.getState().soundDb[groupIndex].audio[index].path})
            .then((response: any) =>
            {
                if (response.status === 200) {                    
                    dispatch(deleteAudio({ groupIndex: groupIndex, audioIndex: index }));
                }
            });
        }
        else
        {
            setConfirmingDelete(true);
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
                {confirmingDelete ? <DeleteForever /> : <Delete />}
            </IconButton>
            <IconButton
                onClick={() => setShowGroupModal(true)}
            >
                <DriveFileMove />
            </IconButton>
            <SelectGroupModal
                open={showGroupModal}
                onClose={() => setShowGroupModal(false)}
                handleSelect={onSendToGroup}
            />
        </span>
    );
};

export default SoundButton;