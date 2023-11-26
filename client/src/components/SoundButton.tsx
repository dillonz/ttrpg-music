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
import { AudioData } from '../App';
import VolumeSlider from './VolumeSlider';

interface SoundButtonProps {
  audio: AudioData
  index: number;
  playAudio: (index: number) => void;
  groupIndex: number;
  isPlaying: boolean;
  isAmbient?: boolean;
}

const SoundButton: React.FC<SoundButtonProps> = ({ audio, index, groupIndex, isPlaying, playAudio, isAmbient }) => {
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

    const handleClick = () => {
        if (isAmbient && isPlaying)
        {
            playAudio(-1);
        }
        else
        {
            playAudio(index)
        }
    };

    return (
        <div
            className="d-flex"
            style={{
                display: "flex",
                minWidth: '300px',
                maxWidth: '500px',
                width: '100%'
            }}
        >
            <Button 
                onClick={handleClick}
                variant="contained"
                color={isPlaying ? "secondary" : "primary" }
                key={audio.path}
                style={{
                    width: isAmbient ? "100%" : "100%",
                    minWidth: isAmbient ? "200px" : "",
                    margin: "5px",
                }}
            >
                {audio.name}
            </Button>
            {
                isAmbient ? 
                <VolumeSlider index={index} groupIndex={groupIndex}/>
                : null
            }
            <IconButton
                onClick={onDeleteClick}
            >
                {confirmingDelete ? <DeleteForever /> : <Delete />}
            </IconButton>
            {
                isAmbient ? 
                null :
                <IconButton
                    onClick={() => setShowGroupModal(true)}
                >
                    <DriveFileMove />
                </IconButton>
            }  
            <SelectGroupModal
                open={showGroupModal}
                onClose={() => setShowGroupModal(false)}
                handleSelect={onSendToGroup}
            />
        </div>
    );
};

export default SoundButton;