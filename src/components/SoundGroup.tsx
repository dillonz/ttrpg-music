import React, { useEffect } from 'react';
import { AudioGroupData } from '../App';
import SoundButton from './SoundButton';
import { Card, CardActions, CardContent, CardHeader, Collapse, IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandButton from './ExpandButton';
import PlayButton from './PlayButton';
import { FastForward } from '@mui/icons-material';


interface SoundGroupProps {
  group: AudioGroupData;
  index: number;
  isPlaying: boolean;
  onPlay: (index: number) => void;
}

interface SoundGroupState {
    expanded: boolean;
    indexPlaying: number;
    shuffledOrder: number[];
    audioIndexTryingToPlay: number;
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

const SoundGroup: React.FC<SoundGroupProps> = ({ group, isPlaying, onPlay, index }) => {
    const styles = soundGroupStyles();

    const [state, setState] = React.useState<SoundGroupState>({expanded: false, indexPlaying:-1, shuffledOrder: [], audioIndexTryingToPlay: -1});

    const [playingSound, setPlayingSound] = React.useState<HTMLAudioElement | undefined>(undefined)

    const handlePlayClick = () => {
        onPlay(index);
    };

    const setExpanded = () => {
        setState({ ...state, expanded: !state.expanded });
    };

    const startSound = (index: number, ixArr: number[]) => {
        if (index >= ixArr.length) index = index % ixArr.length;
        console.log("start", index, ixArr, isPlaying)
        if (isPlaying)
        {            
            const audio = new Audio(group.audio[ixArr[index]].path);
            audio.addEventListener("ended", () => {
                nextAudio();
            });
            audio.play();
            setPlayingSound(audio);
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
        setState({ ...state, indexPlaying: (state.indexPlaying + 1) % group.audio.length });
    };

    const setIndex = (audioIndex: number) => {
        console.log("isplaying", isPlaying)
        if (isPlaying)
        {
            setState({...state, indexPlaying: state.shuffledOrder.indexOf(audioIndex)});
        }
        else
        {
            setState({ ...state, audioIndexTryingToPlay: audioIndex });
            console.log('trying og', state.audioIndexTryingToPlay)
            handlePlayClick();
        }
    }

    const playPause = () => {
        if (isPlaying)
        {
            let tempArr = [];
            console.log("trying", state.audioIndexTryingToPlay)
            if (state.audioIndexTryingToPlay >= 0)
            {
                tempArr.push(state.audioIndexTryingToPlay)
                setState({ ...state, audioIndexTryingToPlay: -1});
            }
            while(tempArr.length < group.audio.length){
                var r = Math.floor(Math.random() * group.audio.length);
                if(tempArr.indexOf(r) === -1) tempArr.push(r);
            }
            setState({...state, shuffledOrder: tempArr, indexPlaying: 0})
        }
        else if (playingSound)
        {
            setState({ ...state, indexPlaying: -1, shuffledOrder: [] });
        }
    }

    // Start and stop playing
    useEffect(() => {
        playPause();
    }, [isPlaying])

    // Handle playing index change
    useEffect(() => {
        console.log(state.indexPlaying);
        // When we were playing but have stopped, fade out
        if (state.indexPlaying < 0 && playingSound)
        {
            fadeOut(playingSound);
        }
        // When we were not playing, but have started, fade in
        else if (state.indexPlaying >= 0 && !playingSound)
        {
            const audio = startSound(0, state.shuffledOrder);
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
            startSound(state.indexPlaying + 1, state.shuffledOrder);
        }
    }, [state.indexPlaying])


    return (
    <Card 
        className={styles.card}
        style={{
            "backgroundColor": group.bgColor,
            "borderRadius": "5px" 
        }}
        variant="outlined"
        raised={true}
        >
             <CardHeader
                action={
                    <CardActions disableSpacing>
                        <ExpandButton expanded={state.expanded} setExpanded={setExpanded}/>
                        <IconButton 
                            aria-label="settings"
                            className={styles.headerAction}
                        >
                            <MoreVertIcon />
                        </IconButton>
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
                // titleTypographyProps={{variant: 'h1' }}
            />            
            <Collapse 
                in={state.expanded} 
                timeout={{appear:0, exit:100, enter:100}}
            >
                <CardContent>
                    {
                        group.audio.map((audio, index) => (
                            <SoundButton 
                                name={audio.name} 
                                path={audio.path} 
                                index={index}
                                indexPlayingInGroup={state.shuffledOrder[state.indexPlaying]}
                                playSpecificAudio={setIndex}
                            />
                        ))
                    }
                </CardContent>
            </Collapse>
    </Card>
  );
};

export default SoundGroup;