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
import { useDispatch } from 'react-redux';
import { addAudio } from '../redux/actions';
import store from '../redux/store';

interface AddAudioModalProps {
  open: boolean;
  onClose: () => void;
}

const AddAudioModal: React.FC<AddAudioModalProps> = ({ open, onClose }) => {
    const theme=useTheme();
    const radioGroupRef = React.useRef<HTMLElement>(null);
    const [group, setGroup] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState<File | undefined>(undefined);
    const [name, setName] = React.useState("");

    const dispatch = useDispatch();

    function handleClose(event: any): void {
        event.preventDefault();
        setSelectedFile(undefined);
        setGroup(0);
        onClose();
    }

    function handleAdd(event: any): void {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
    
            axios.post('/upload', formData)
            .then((response: any) => {
                if (response.status === 200) {
                    dispatch(addAudio({ groupIndex: group, audioName: name, audioPath: response.data.name }))
                } else {
                    console.error('File upload failed');
                }
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
        }
        setSelectedFile(undefined);
        setGroup(0);
        onClose();
    }

    const handleNameChange = (event: any) => {
        setName(event.target.value)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroup(Number((event.target as HTMLInputElement).value));
    };
    
    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>Add Audio</DialogTitle>
                <DialogContent>
                    <FileUploader
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    />
                    { selectedFile ? (
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Audio Name"
                            fullWidth
                            value={name}
                            onChange={handleNameChange}
                            defaultValue={selectedFile.name.replace(/\.[^\/.]+$/, "")}
                            variant="standard"
                            sx={{
                                mb: 2
                            }}
                        />
                        <b>Group:</b>
                        <RadioGroup
                            ref={radioGroupRef}
                            aria-label="group"
                            name="group"
                            value={group}
                            onChange={handleChange}
                            hidden={!selectedFile}
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
                    )
                    : null }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button 
                        onClick={handleAdd}
                        disabled={!selectedFile || !name || group < 0}
                    >Add</Button>
                </DialogActions>
            </Dialog> 
        </div>
    );
};

export default AddAudioModal;