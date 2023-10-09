import React, { useEffect } from 'react';
import { AppState, AudioGroupData } from '../App';
import SoundButton from './SoundButton';
import { Card, CardActions, CardContent, CardHeader, Collapse, IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandButton from './ExpandButton';
import PlayButton from './PlayButton';
import { FastForward } from '@mui/icons-material';
import MoreButton from './MoreButton';


interface SoundGroupProps {
  group: AudioGroupData;
  index: number;
  isPlaying: boolean;
  onPlay: (index: number) => void;
  onDeleteAudio: (group: AudioGroupData, audioIndex: number) => void;
  state: AppState;
  setState: (val: any) => void;
}

interface SoundGroupState {
    expanded: boolean;
    indexPlaying: number;
    shuffledOrder: number[];
    audioIndexTryingToPlay: number;
    startPlaying: boolean;
}

const soundGroupStyles = makeStyles(() => ({
    card: {
        width: '500px',
        borderRadius: 16,
        margin: "10px",
        display: "inline-block",
    },
    header: {
        marginRight: '15px',
        float: 'left',
        width: "95%",
        textAlign: 'left',
        fontWeight: 'bold',
        overflow: 'auto',
        fontSize: '32px',
    },
    headerAction: {
        textAlign: 'right',
    },

}));

const SoundGroup: React.FC<SoundGroupProps> = ({ group, isPlaying, onPlay, index, onDeleteAudio, state, setState }) => {
    const styles = soundGroupStyles();

    const [internalState, setInternalState] = React.useState<SoundGroupState>({
        expanded: false, 
        indexPlaying:-1, 
        shuffledOrder: [], 
        audioIndexTryingToPlay: -1,
        startPlaying: false,
    });

    const [playingSound, setPlayingSound] = React.useState<HTMLAudioElement | undefined>(undefined)

    const handlePlayClick = () => {
        onPlay(index);
    };

    const setExpanded = () => {
        setInternalState({ ...internalState, expanded: !internalState.expanded });
    };

    const onDeleteAudioInternal = (index: number) => {
        onDeleteAudio(group, index);
    };

    const startSound = (index: number, ixArr: number[]) => {
        if (index >= ixArr.length) index = index % ixArr.length;
        if (isPlaying)
        {            
            const audio = new Audio('/audio/' + group.audio[ixArr[index]].path);
            audio.addEventListener("ended", () => {
                nextAudio();
            });
            audio.play();
            setPlayingSound(audio);
            setInternalState({ ...internalState, startPlaying: false });
            return audio;
        }
    };

    const fadeOut = (audio: HTMLAudioElement, runs: number = 0) => {
        if (audio.volume > 0 && runs < 100)
        {
            const newVol = audio.volume - 0.01;
            audio.volume = newVol > 0 ? newVol : 0;
            setTimeout(fadeOut, 20, audio, runs + 1);
        }
        else
        {
            audio.pause();
            audio.srcObject = null;
        }
    }

    const fadeIn = (audio: HTMLAudioElement, runs: number = 0) => {
        if (audio.volume < 1 && runs < 100)
        {
            const newVol = audio.volume + 0.01;
            audio.volume = newVol < 1 ? newVol : 1;
            setTimeout(fadeIn, 20, audio, runs + 1);
        }
    };

    const nextAudio = () => {
        playingSound?.pause();
        if (playingSound) playingSound.srcObject = null;
        setInternalState({ ...internalState, indexPlaying: (internalState.indexPlaying + 1) % group.audio.length });
    };

    const setIndex = (audioIndex: number) => {
        if (isPlaying)
        {
            setInternalState({...internalState, indexPlaying: internalState.shuffledOrder.indexOf(audioIndex)});
        }
        else
        {
            setInternalState({ ...internalState, audioIndexTryingToPlay: audioIndex });
            handlePlayClick();
        }
    }

    const playPause = () => {
        if (isPlaying)
        {
            let tempArr = [];
            if (internalState.audioIndexTryingToPlay >= 0)
            {
                tempArr.push(internalState.audioIndexTryingToPlay)
            }
            while(tempArr.length < group.audio.length){
                var r = Math.floor(Math.random() * group.audio.length);
                if(tempArr.indexOf(r) === -1) tempArr.push(r);
            }
            setInternalState({...internalState, shuffledOrder: tempArr, indexPlaying: 0, audioIndexTryingToPlay: -1, startPlaying: true})
        }
        else if (playingSound)
        {
            setInternalState({ ...internalState, indexPlaying: -1, shuffledOrder: [], audioIndexTryingToPlay: -1 });
        }
    }

    // Start and stop playing
    useEffect(() => {
        playPause();
    }, [isPlaying])

    // Handle playing index change
    useEffect(() => {
        // When we were playing but have stopped, fade out
        if (internalState.indexPlaying < 0 && playingSound)
        {
            fadeOut(playingSound);
        }
        // When we were not playing, but have started, fade in
        else if (internalState.startPlaying)
        {
            const audio = startSound(0, internalState.shuffledOrder);
            if (audio)
            {
                audio.volume = 0;
                fadeIn(audio);
            }
        }
        // When we change the audio clip, skip to it
        else
        {
            playingSound?.pause();
            if (playingSound) playingSound.srcObject = null;
            setPlayingSound(undefined);
            startSound(internalState.indexPlaying + 1, internalState.shuffledOrder);
        }
    }, [internalState.indexPlaying])

    return (
    <Card 
        className={styles.card}
        style={{
            "backgroundColor": group.bgColor,
            "borderRadius": "5px" 
        }}
        variant="outlined"
        >
             <CardHeader
                action={
                    <CardActions disableSpacing>
                        <ExpandButton expanded={internalState.expanded} setExpanded={setExpanded}/>
                        <MoreButton state={state} setState={setState} groupIndex={index} />
                        <IconButton 
                            aria-label="settings"
                            className={styles.headerAction}
                            onClick={nextAudio}
                        >
                            <FastForward />
                        </IconButton>
                        <PlayButton playing={isPlaying} onClick={handlePlayClick}/>
                    </CardActions>
                }
                title={group.groupName}
                className={styles.header}
                sx={{ fontWeight: 'bolder' }}
            />            
            <Collapse 
                in={internalState.expanded} 
                timeout={{appear:0, exit:100, enter:100}}
            >
                <CardContent>
                    {
                        group.audio.map((audio, i) => (
                            <SoundButton 
                                key={audio.name}
                                name={audio.name} 
                                path={audio.path} 
                                index={i}
                                indexPlayingInGroup={internalState.shuffledOrder[internalState.indexPlaying]}
                                playSpecificAudio={setIndex}
                                onDelete={onDeleteAudioInternal}
                            />
                        ))
                    }
                </CardContent>
            </Collapse>
    </Card>
  );
};

export default SoundGroup;