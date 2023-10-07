import React, { useEffect } from 'react';
import SoundButton from './SoundButton';
import { AudioGroupData, AudioData, AppState } from '../App';
import SoundGroup from './SoundGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Add, AddCircle, CreateNewFolder, MusicNote } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import AddAudioModal from './AddAudioModal';
import { SvgIconComponent } from '@mui/icons-material';

interface AddButtonProps {
  state: AppState; // Array of sound file paths
  setState: (val: any) => void;
}

interface OptionType {
    title: string;
    iconType: SvgIconComponent;
    modalType: typeof AddAudioModal;
}
const options: OptionType[] = [
    {
        title: 'Add audio',
        iconType: MusicNote,
        modalType: AddAudioModal
    },
    {
        title: 'Add group',
        iconType: CreateNewFolder,
        modalType: AddAudioModal
    }
]

const AddButton: React.FC<AddButtonProps> = ({ state, setState }) => {
    const theme=useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const open = Boolean(anchorEl);

    const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        console.log('add click', state)
        setSelectedIndex(-1);
    }

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
      ) => {
        setSelectedIndex(index);
        console.log("menu item click", state, index);
        setAnchorEl(null);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <div>
            <IconButton
                style={{
                    borderRadius: '100px',
                    backgroundColor: theme.palette.primary.main
                }}
                id='add-button'
                size='large'
                aria-haspopup="listbox"
                aria-controls="add-menu"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => handleAddClick(event)}
            >
                <Add/>
            </IconButton>
            <Menu
                id="add-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'add-button',
                    role: 'listbox',
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: -1,
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        bottom: 0,
                        right: 19,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(50%) rotate(45deg)',
                        zIndex: 0,
                      }
                    },
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
            {options.map((option, index) => (
                <option.modalType 
                                state={state} 
                                setState={setState} 
                                open={index === selectedIndex}
                            />
            ))}
        </div>
    );
};

export default AddButton;