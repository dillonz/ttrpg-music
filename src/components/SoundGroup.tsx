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
}

const soundGroupStyles = makeStyles(() => ({
    card: {
        width: '500px',
        borderRadius: 16,
        overflow: 'hidden',
        margin: "10px",
        display: "inline-block",
    },
    header: {
        marginRight: '15px',
        float: 'left',
        width: "95%",
        textAlign: 'left',
    },
    headerAction: {
        textAlign: 'right',
    },

}));

const SoundGroup: React.FC<SoundGroupProps> = ({ group, isPlaying, onPlay, index }) => {
    const styles = soundGroupStyles();

    const [state, setState] = React.useState<SoundGroupState>({expanded: false, indexPlaying:-1, shuffledOrder: []});

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
            console.log("inner", isPlaying);
            const audio = new Audio(group.audio[ixArr[index]].path);
            console.log(audio);
            audio.addEventListener("ended", () => {
                startSound(index + 1, ixArr);
            });
            audio.play();
            console.log("played");
            setPlayingSound(audio);
            setState({...state, indexPlaying: index, shuffledOrder: ixArr});
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

    const onSkip = () => {
        if (playingSound)
        {
            fadeOut(playingSound);
            const audio = startSound(state.indexPlaying + 1, state.shuffledOrder);
            if (audio)
            {
                audio.volume = 0;
                fadeIn(audio);
            }
        }
    };

    useEffect(() => {
        if (isPlaying)
        {
            let tempArr = [];
            while(tempArr.length < group.audio.length){
                var r = Math.floor(Math.random() * group.audio.length);
                if(tempArr.indexOf(r) === -1) tempArr.push(r);
            }
            setState({...state, shuffledOrder: tempArr})
            console.log(state);
            const audio = startSound(0, tempArr);
            if (audio)
            {
                audio.volume = 0;
                fadeIn(audio);
            }
        }
        else if (playingSound)
        {
            fadeOut(playingSound);
        }
    }, [isPlaying])

    // Handle playing index change
    useEffect(() => {

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
                            onClick={onSkip}
                        >
                            <FastForward />
                        </IconButton>
                        <PlayButton playing={isPlaying} onClick={handlePlayClick}/>
                    </CardActions>
                }
                title={group.groupName}
                className={styles.header}
            />            
            <Collapse 
                in={state.expanded} 
                timeout={{appear:0, exit:100, enter:100}}
            >
                <CardContent>
                    {
                        group.audio.map((audio) => (
                            <SoundButton name={audio.name} path={audio.path}/>
                        ))
                    }
                </CardContent>
            </Collapse>
    </Card>
  );
};

export default SoundGroup;