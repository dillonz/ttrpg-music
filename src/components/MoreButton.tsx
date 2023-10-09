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

interface MoreButtonProps {
  state: AppState; // Array of sound file paths
  setState: (val: any) => void;
  groupIndex: number;
}

interface OptionType {
    title: string;
    iconType: SvgIconComponent;
    modalType: typeof AddAudioModal;
}
const options: OptionType[] = [
    {
        title: 'Edit',
        iconType: Edit,
        modalType: AddAudioModal
    },
    {
        title: 'Delete',
        iconType: Delete,
        modalType: AddGroupModal
    }
]

const MoreButton: React.FC<MoreButtonProps> = ({ state, setState, groupIndex }) => {
    const theme=useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const open = Boolean(anchorEl);

    const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setSelectedIndex(-1);
    }

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
      ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
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
                style={{
                    //borderRadius: '100px',
                    //backgroundColor: theme.palette.primary.main
                }}
                id='more-button'
                size='large'
                aria-haspopup="listbox"
                aria-controls="more-menu"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => handleAddClick(event)}
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
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        <ListItemIcon>
                            <option.iconType fontSize='small'/>
                        </ListItemIcon>
                        {option.title}
                        </MenuItem>
                ))}
            </Menu>
            {/* {options.map((option, index) => (
                <option.modalType 
                                state={state} 
                                setState={setState} 
                                open={index === selectedIndex}
                                onClose={onCloseModal}
                                key={option.title}
                            />
            ))} */}
        </div>
    );
};

export default MoreButton;