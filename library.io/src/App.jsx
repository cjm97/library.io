import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Reading from './pages/Reading';
import ToRead from './pages/ToRead';
import Read from './pages/Read';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Explore from './pages/Explore';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';
import { CssBaseline } from '@mui/material';
import Friends from './pages/Friends';
import Shelves from './pages/Shelves';
import UserProvider from './contexts/userContext';
import User from './pages/User';

function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={darkTheme}>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/reading' element={<Reading />}></Route>
            <Route path='/toread' element={<ToRead />}></Route>
            <Route path='/read' element={<Read />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/signin' element={<SignIn />}></Route>
            <Route path='/explore' element={<Explore />}></Route>
            <Route path='/friends' element={<Friends />}></Route>
            <Route path='/shelves' element={<Shelves />}></Route>
            <Route path='/user' element={<User />}></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
