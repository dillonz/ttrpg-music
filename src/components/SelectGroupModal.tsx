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
import store from '../redux/store';

interface SelectGroupModal {
  open: boolean;
  onClose: () => void;
  handleSelect: (index: number) => void;
}

const SelectGroupModal: React.FC<SelectGroupModal> = ({ open, onClose, handleSelect }) => {
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
                            {store.getState().soundDb.map((group, index) => (
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
                        onClick={(event) => {handleSelect(group); handleClose(event);}}
                        disabled={group < 0}
                    >Select</Button>
                </DialogActions>
            </Dialog> 
        </div>
    );
};

export default SelectGroupModal;