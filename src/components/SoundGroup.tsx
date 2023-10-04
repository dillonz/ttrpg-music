import React, { useEffect } from 'react';
import { AudioGroupData } from '../App';
import SoundButton from './SoundButton';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, IconButtonProps, Typography, styled } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';
import ExpandButton from './ExpandButton';
import PlayButton from './PlayButton';


interface SoundGroupProps {
  group: AudioGroupData;
  index: number;
  isPlaying: boolean;
  onPlay: (index: number) => void;
}

interface SoundGroupState {
    expanded: boolean;
    indexPlaying: number;
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

    const [state, setState] = React.useState<SoundGroupState>({expanded: false, indexPlaying:-1});

    const [playingSound, setPlayingSound] = React.useState<HTMLAudioElement | undefined>(undefined)

    const handlePlayClick = () => {
        onPlay(index);
    };

    const setExpanded = () => {
        setState({ ...state, expanded: !state.expanded });
    };

    const startSound = () => {
        if (isPlaying)
        {
            let newIx = state.indexPlaying;
            while ((newIx === state.indexPlaying && group.audio.length > 1) || newIx === -1)
            {
                newIx = Math.floor(Math.random() * group.audio.length);
                console.log(newIx, "state", state.indexPlaying, "length", group.audio.length);
            }
            const audio = new Audio(group.audio[newIx].path);
            setPlayingSound(audio);
            audio.addEventListener("ended", () => {
                startSound();
            });
            setState({...state, indexPlaying: newIx});
            audio.play();
        }
    };

    function fade(audio: HTMLAudioElement) {
        if(audio.volume > 0){
            audio.volume -= 0.1;
            setTimeout(fade, 2);
        }else{
            audio.pause();
        }
    }

    useEffect(() => {
        if (isPlaying)
        {
            startSound();
        }
        else if (playingSound)
        {
            fade(playingSound);
        }
    }, [isPlaying])

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