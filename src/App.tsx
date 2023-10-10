import React, { useEffect, useState } from 'react';
import './App.css';
import SoundBoard from './components/SoundBoard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FileUploader from './components/FileUploader';
import { makeStyles } from '@material-ui/core/styles';
import { blue, green, purple } from '@mui/material/colors';
import AddButton from './components/AddButton';
import axios from 'axios';

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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="contentContainer">
          <div className="content">
            <SoundBoard />
            <div className='bottom-right'>
            <AddButton />
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