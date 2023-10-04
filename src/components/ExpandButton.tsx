import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

interface ExpandButtonProps {
    expanded: boolean;
    setExpanded: (value: any) => void;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({ expanded, setExpanded }) => {

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <IconButton
            onClick={handleExpandClick}
        >
            <ExpandMoreIcon
                style={{
                    transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
                    transition: 'transform .4s',
                }}
            />
        </IconButton>
    );
};

export default ExpandButton;