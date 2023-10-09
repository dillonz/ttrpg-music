import React, { useEffect } from 'react';
import SoundButton from './SoundButton';
import { AudioGroupData, AudioData, AppState } from '../App';
import SoundGroup from './SoundGroup';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
        axios.post('/delete_audio', { path: group.audio[index].path})
            .then((response: any) =>
            {
                if (response.status === 200) {                    
                    let db = state.soundDb;
                    db[db.indexOf(group)].audio.splice(index,1);
                    setState({ ...state, soundDb: db})
                    axios.post('/save_state', db);
                }
            });
    };

    return (
        <div>
            {
                state.soundDb.map((group, i) => (
                    <SoundGroup 
                        group={group}
                        key={group.groupName}
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