import React, { useEffect } from 'react';
import SoundButton from './SoundButton';
import { AudioGroupData, AudioData, AppState } from '../App';
import SoundGroup from './SoundGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { Add, AddCircle } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface AddAudioModalProps {
  state: AppState; // Array of sound file paths
  setState: (val: any) => void;
  open: boolean;
}

const options = [
    'Add audio',
    'Add group'
]

const AddAudioModal: React.FC<AddAudioModalProps> = ({ state, setState, open }) => {
    const theme=useTheme();

    function handleClose(): void {
        console.log(state);
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog> 
        </div>
    );
};

export default AddAudioModal;