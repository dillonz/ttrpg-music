import React, { useEffect } from 'react';
import SoundButton from './SoundButton';
import { AudioGroupData, AudioData, AppState } from '../App';
import SoundGroup from './SoundGroup';
import { makeStyles } from '@material-ui/core/styles';

interface SoundBoardProps {
  state: AppState; // Array of sound file paths
  setState: (val: any) => void;
}

const SoundBoard: React.FC<SoundBoardProps> = ({ state, setState }) => {
    const onClickPlay = (index: number) => {
        if (state.groupPlayingIx === index)
        {
            setState({...state, groupPlayingIx: -1});
        }
        else
        {
            setState({...state, groupPlayingIx: index});
        }
    };

    const onDeleteAudio = (group: AudioGroupData, index: number) => {
        // Actually delete
    };

    return (
        <div>
            {
                state.soundDb.map((group, i) => (
                    <SoundGroup 
                        group={group}
                        index={i}
                        isPlaying={state.groupPlayingIx === i}
                        onPlay={onClickPlay}
                        onDeleteAudio={onDeleteAudio}
                    />
                ))
            }
        </div>
    );
};

export default SoundBoard;