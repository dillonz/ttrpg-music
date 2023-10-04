import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';

interface SoundButtonProps {
  name: string;
  path: string;
}

const SoundButton: React.FC<SoundButtonProps> = ({ name, path }) => {
    const playAudio = () => {
        const audio = new Audio(path);
        audio.play();
    };

    return (
        <Button 
            onClick={playAudio}
            variant="contained"
            color="primary"
            key={path}
            style={{
                width: "100%",
                margin: "5px",
            }}
        >
            {name}
        </Button>
    );
};

export default SoundButton;