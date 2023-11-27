import React, { useCallback, useEffect } from 'react';
import { AppState, AudioGroupData } from '../App';
import SoundButton from './SoundButton';
import { Card, CardActions, CardContent, CardHeader, Collapse, IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandButton from './ExpandButton';
import PlayButton from './PlayButton';
import { FastForward } from '@mui/icons-material';
import MoreButton from './MoreButton';
import internal from 'stream';


interface AmbientGroupProps {
  group: AudioGroupData;
  index: number;
}

const ambientGroupStyles = makeStyles(() => ({
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

const AmbientGroup: React.FC<AmbientGroupProps> = ({ group, index }) => {
    const styles = ambientGroupStyles();

    const [indexPlaying, setIndexPlaying] = React.useState(-1);
    const [expanded, setExpanded] = React.useState(false);
    const [playing, setPlaying] = React.useState(false);

    const [playingSound, setPlayingSound] = React.useState<HTMLAudioElement | undefined>(undefined)

    const startSound = (index: number) => {
        console.log(index);
        const song = group.audio[index];
        const audio = new Audio('/audio/' + song.path);
        audio.volume = !song.volume ? 1 : song.volume / 100;
        audio.loop = true;
        audio.play();
        setPlayingSound(audio);
        return audio;
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

    // Handle playing index change
    useEffect(() => {
        if (group.audio.length === 0) return;
        // When we were playing but have stopped, fade out
        if (indexPlaying < 0 && playingSound)
        {
            //console.log('top',internalState)
            fadeOut(playingSound);
            setPlayingSound(undefined);
        }
        // When we were not playing, but have started, fade in
        else if (indexPlaying >= 0 && !playingSound)
        {
            //console.log('mid',internalState)
            const audio = startSound(indexPlaying);
            if (audio)
            {
                audio.volume = 0;
                fadeIn(audio);
            }
        }
        // When we change the audio clip, skip to it
        else if (playingSound)
        {
            //console.log('bot',internalState)
            setPlayingSound(undefined);
            fadeOut(playingSound)
            const audio = startSound(indexPlaying);
            fadeIn(audio)
        }
    }, [indexPlaying])

    useEffect(() => {
        if (playingSound && !!group.audio[indexPlaying].volume)
        {
            playingSound.volume = group.audio[indexPlaying].volume as number / 100;
        }
    }, [group.audio])

    return (
    <Card 
        className={styles.card}
        style={{
            "backgroundColor": group.bgColor,
            "borderRadius": "5px",
            "width": "95%"
        }}
        variant="outlined"
        >
             <CardHeader
                title={group.groupName}
                className={styles.header}
                sx={{ fontWeight: 'bolder' }}
                onClick={() => setExpanded(!expanded)}
            />            
            <Collapse 
                in={expanded}
                timeout={{appear:0, exit:100, enter:100}}
            >
                <CardContent>
                    <div className="d-flex flex-wrap">
                        {
                            group.audio.map((audio, i) => (
                                <SoundButton 
                                    key={audio.name}
                                    audio={audio}
                                    index={i}
                                    playAudio={setIndexPlaying}
                                    groupIndex={index}
                                    isPlaying={indexPlaying === i}
                                    isAmbient={true}
                                />
                            ))
                        }
                    </div>
                </CardContent>
            </Collapse>
    </Card>
  );
};

export default AmbientGroup;