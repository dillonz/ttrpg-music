import { Slider } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppState } from '../App';
import { editVolume } from '../redux/actions';

interface VolumeSliderProps {
  index: number;
  groupIndex: number;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ index, groupIndex }) => {
    let volume = useSelector((state: AppState) => state.soundDb[groupIndex].audio[index].volume)
    const dispatch = useDispatch();

    const handleChange = (event: Event, volume: number | number[]) => {
      dispatch(editVolume({ groupIndex: groupIndex, audioIndex: index, newVolume: volume as number }));
    };

    return (
        <Slider 
          aria-label="Volume" 
          value={volume} 
          onChange={handleChange} 
          style={{
            width: '150px',
            display: 'flex',
            marginTop: '8px',
            marginRight: '15px',
            marginLeft: '15px'
          }}
        />
    );
};

export default VolumeSlider;