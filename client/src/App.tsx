import React, { useEffect, useState } from 'react';
import './App.css';
import SoundBoard from './components/SoundBoard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FileUploader from './components/FileUploader';
import { makeStyles } from '@material-ui/core/styles';
import { blue, green, purple } from '@mui/material/colors';
import AddButton from './components/AddButton';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadState } from './redux/actions';
import { updateState } from './redux/reducers';
import store from './redux/store';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: purple[500],
    },
    background: {
      default: "#222222",
    }
  },
});

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
  isLoaded: boolean;
  groupPlayingIx: number;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoaded = useSelector((state: AppState) => state.isLoaded);

  useEffect(() => {
    if (!isLoaded) {
      axios
      .get('/get_state')
      .then((response) => {
        console.log(response);
        dispatch(loadState(response.data as AudioGroupData[]))
      });
    }
  }, [dispatch, isLoaded]);

  window.addEventListener("beforeunload", (event) => {
    updateState(store.getState().soundDb);
  });

  if (isLoaded) return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <div className="App">
        <div className="contentContainer">
          <div className="content">
            <SoundBoard />
            <div className='bottom-right'>
            <AddButton />
            </div>
          </div>
        </div>
      </div>
      </CssBaseline>
    </ThemeProvider>
  );
  return null;
};

export default App;