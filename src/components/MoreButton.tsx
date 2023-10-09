import React, { useEffect } from 'react';
import SoundButton from './SoundButton';
import { AudioGroupData, AudioData, AppState } from '../App';
import SoundGroup from './SoundGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Add, AddCircle, CreateNewFolder, Delete, Edit, MusicNote } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import AddAudioModal from './AddAudioModal';
import { SvgIconComponent } from '@mui/icons-material';
import AddGroupModal from './AddGroupModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios'

interface MoreButtonProps {
  state: AppState; // Array of sound file paths
  setState: (val: any) => void;
  groupIndex: number;
}

interface OptionType {
    title: string;
    iconType: SvgIconComponent;
    callback: () => void;
}

const MoreButton: React.FC<MoreButtonProps> = ({ state, setState, groupIndex }) => {
    const theme=useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [editOpen, setEditOpen] = React.useState(false);

    const onDelete = () =>
    {
        state.soundDb[groupIndex].audio.forEach((val: AudioData) => {
            axios.post('/delete_audio', { path: val.path })
        });

        const db = state.soundDb;
        db.splice(groupIndex, 1);
        setState({ ...state, soundDb: db});
        axios.post('/save_state', db);
    }

    const onEdit = () => {
        console.log(groupIndex)
        setEditOpen(true);
    }

    const options: OptionType[] = [
        {
            title: 'Edit',
            iconType: Edit,
            callback: onEdit
        },
        {
            title: 'Delete',
            iconType: Delete,
            callback: onDelete
        }
    ]
    
    const open = Boolean(anchorEl);

    const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setSelectedIndex(-1);
    }

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
        callback?: () => void
      ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        if (callback) callback();
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const onCloseModal = () => {
        setSelectedIndex(-1);
      };

    return (
        <div>
            <IconButton
                id='more-button'
                size='large'
                aria-haspopup="listbox"
                aria-controls="more-menu"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => handleMoreMenuClick(event)}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="more-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'more-button',
                    role: 'listbox',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option.title}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index, option.callback)}
                    >
                        <ListItemIcon>
                            <option.iconType fontSize='small'/>
                        </ListItemIcon>
                        {option.title}
                        </MenuItem>
                ))}
            </Menu>
            <AddGroupModal
                state={state}
                setState={setState}
                open={editOpen}
                onClose={() => { setEditOpen(false) }}
                editingIndex={groupIndex}
            />
        </div>
    );
};

export default MoreButton;