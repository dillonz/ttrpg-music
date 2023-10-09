import React, { useEffect, useState } from 'react';
import SoundButton from './SoundButton';
import { AudioGroupData, AudioData, AppState } from '../App';
import SoundGroup from './SoundGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Menu, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import { Add, AddCircle } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import FileUploader from './FileUploader';
import axios from 'axios';
import { Color, ColorPicker, createColor } from "material-ui-color";

interface AddGroupModalProps {
  state: AppState; // Array of sound file paths
  setState: (val: AppState) => void;
  open: boolean;
  onClose: () => void;
  editingIndex?: number;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ state, setState, open, onClose, editingIndex }) => {
    const theme=useTheme();

    const [name, setName] = useState('');
    const [color, setColor] = useState<Color>(createColor('red'));
    
    useEffect(() => {
        if (editingIndex !== undefined)
        {
            console.log('open change')
            const group = state.soundDb[editingIndex];
            setName(group.groupName);
            setColor(createColor(group.bgColor));
        }
    }, [open])

    function handleClose(event?: any): void {
        event?.preventDefault();
        setColor(createColor('red'));
        setName("");
        onClose();
    }

    function handleAdd(event: any): void {
        event.preventDefault();

        if (name && color)
        {
            let db = state.soundDb;
            if (editingIndex === undefined)
            {
                const newGroup: AudioGroupData = { groupName: name, bgColor: '#' + color.hex, audio: []}
                db.push(newGroup);
            }
            else
            {
                db[editingIndex].groupName = name;
                db[editingIndex].bgColor = '#' + color.hex;
            }
            setState({ ...state, soundDb: db });
            axios.post('/save_state', db);
        }
        handleClose();
    }

    const handleNameChange = (event: any) => {
        setName(event.target.value)
    }

    const handleColorChange = (newColor: any) => {
        setColor(newColor);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Add Group</DialogTitle>
                <DialogContent sx={{height: 'auto'}}>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Group Name"
                            fullWidth
                            value={name}
                            onChange={handleNameChange}
                            variant="standard"
                            sx={{
                                mb: 2
                            }}
                        />
                        <span style={{ display: 'flex' }}>
                            <div style={{ marginTop: '5px'}}>Color:</div>
                            <ColorPicker
                                value={color} 
                                onChange={handleColorChange} 
                                disableAlpha 
                                hideTextfield/>
                        </span>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        onClick={handleAdd}
                        disabled={!name}
                    >{editingIndex !== undefined ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog> 
        </div>
    );
};

export default AddGroupModal;