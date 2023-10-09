import React, { useEffect } from 'react';
import SoundButton from './SoundButton';
import { AudioGroupData, AudioData, AppState } from '../App';
import SoundGroup from './SoundGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Menu, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import { Add, AddCircle } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import FileUploader from './FileUploader';
import axios from 'axios';

interface AddAudioModalProps {
  state: AppState; // Array of sound file paths
  setState: (val: AppState) => void;
  open: boolean;
  onClose: () => void;
  handleSelect: (index: number) => void;
}

const AddAudioModal: React.FC<AddAudioModalProps> = ({ state, setState, open, onClose, handleSelect }) => {
    const theme=useTheme();
    const radioGroupRef = React.useRef<HTMLElement>(null);
    const [group, setGroup] = React.useState(0);

    function handleClose(event: any): void {
        event.preventDefault();
        setGroup(0);
        onClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroup(Number((event.target as HTMLInputElement).value));
    };
    
    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Add Audio</DialogTitle>
                <DialogContent>
                    <div>
                        <b>Group:</b>
                        <RadioGroup
                            ref={radioGroupRef}
                            aria-label="group"
                            name="group"
                            value={group}
                            onChange={handleChange}
                        >
                            {state.soundDb.map((group, index) => (
                                <FormControlLabel
                                    value={index}
                                    key={group.groupName}
                                    control={<Radio />}
                                    label={group.groupName}
                                />
                            ))}
                        </RadioGroup>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        onClick={() => handleSelect(group)}
                        disabled={group < 0}
                    >Select</Button>
                </DialogActions>
            </Dialog> 
        </div>
    );
};

export default AddAudioModal;