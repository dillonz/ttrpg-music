import React, { useEffect } from 'react';
import SoundButton from './SoundButton';
import { AudioGroupData, AudioData, AppState } from '../App';
import SoundGroup from './SoundGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Add, AddCircle, CreateNewFolder, DriveFileMove, MusicNote } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import AddAudioModal from './AddAudioModal';
import { SvgIconComponent } from '@mui/icons-material';
import AddGroupModal from './AddGroupModal';

interface MoveAudioButtonProps {
  state: AppState; // Array of sound file paths
  setState: (val: any) => void;
}

const MoveAudioButton: React.FC<MoveAudioButtonProps> = ({ state, setState }) => {
    const theme=useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleMoveClick = (event: any) => {
        event.preventDefault();
    }
    return (
        <div>
            <IconButton
                id='move-button'
                size='large'
                aria-haspopup="listbox"
                aria-controls="add-menu"
                onClick={(event) => handleMoveClick(event)}
            >
                <DriveFileMove/>
            </IconButton>
        </div>
    );
};

export default MoveAudioButton;