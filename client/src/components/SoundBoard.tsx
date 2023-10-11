import React, { useEffect } from 'react';
import SoundButton from './SoundButton';
import { AudioGroupData, AudioData, AppState } from '../App';
import SoundGroup from './SoundGroup';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAudio, playGroup } from '../redux/actions';

interface SoundBoardProps {
}

const SoundBoard: React.FC<SoundBoardProps> = ({ }) => {
    const groupPlayingIx = useSelector((state: AppState) => state.groupPlayingIx);
    const soundDb = useSelector((state: AppState) => state.soundDb);
    const dispatch = useDispatch();

    const onClickPlay = (index: number) => {
        dispatch(playGroup(groupPlayingIx === index ? -1 : index ))
    };

    return (
        <div>
            {
                soundDb.map((group, i) => (
                    <SoundGroup 
                        group={group}
                        key={group.groupName}
                        index={i}
                        isPlaying={groupPlayingIx === i}
                        onPlay={onClickPlay}
                    />
                ))
            }
        </div>
    );
};

export default SoundBoard;