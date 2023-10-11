import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Menu, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Color, ColorPicker, createColor } from "material-ui-color";
import { createGroup, editGroup } from '../redux/actions';
import { useDispatch } from 'react-redux';
import store from '../redux/store';

interface AddGroupModalProps {
  open: boolean;
  onClose: () => void;
  editingIndex?: number;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ open, onClose, editingIndex }) => {
    const theme=useTheme();

    const [name, setName] = useState('');
    const [color, setColor] = useState<Color>(createColor('red'));
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingIndex !== undefined)
        {
            const group = store.getState().soundDb[editingIndex];
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
            if (editingIndex === undefined)
            {
                dispatch(createGroup({ groupName: name, bgColor: '#' + color.hex }))
            }
            else
            {
                dispatch(editGroup({ groupName: name, bgColor: '#' + color.hex, groupIndex: editingIndex }))
            }
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