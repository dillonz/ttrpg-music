import React, { useState } from 'react';
import './App.css';
import SoundBoard from './components/SoundBoard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FileUploader from './components/FileUploader';
import soundDb from './sound-db.json'
import { makeStyles } from '@material-ui/core/styles';
import { blue, green, purple } from '@mui/material/colors';
import AddButton from './components/AddButton';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: purple[500],
    },
  }
},);

export interface AudioGroupData {
  groupName: string;
  bgColor: string;
  audio: AudioData[];
}

export interface AudioData {
  name: string;
  path: string;
}

export interface AppState {
  soundDb: AudioGroupData[];
  groupPlayingIx: number;
}

const App: React.FC = () => {
  const sounds = soundDb as AudioGroupData[]

  let [state, setState] = useState<AppState>({soundDb: sounds, groupPlayingIx: -1});

  const handleFileUpload = (file: File) => {
    // Handle the selected file here, e.g., upload it to a server or process it in some way.
    console.log('Selected file:', file);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="contentContainer">
          <div className="content">
            <SoundBoard state={state} setState={setState}/>
            <div className='bottom-right'>
            <AddButton 
              state={state} 
              setState={setState}
            ></AddButton>
            </div>
          </div>
        </div>
        {/* <footer className="footer">
          <FileUploader />
        </footer> */}
      </div>
    </ThemeProvider>
  );
};

export default App;