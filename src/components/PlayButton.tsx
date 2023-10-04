import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { PlayArrow } from '@mui/icons-material';

interface PlayButtonProps {
    playing: boolean;
    onClick: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ playing, onClick }) => {
    return (
        <IconButton
            onClick={onClick}
        >
            <PlayArrow
                style={{
                    color: playing ? '#1976D2' : 'rgba(256,256,256,.75)',
                    transition: 'color .4s',
                    borderRadius: '100px',
                    backgroundColor: 'rgba(0, 0, 0, .7)'
                }}
            />
        </IconButton>
    );
};

export default PlayButton;