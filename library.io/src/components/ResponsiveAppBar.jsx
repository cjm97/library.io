import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';
import axios from 'axios';

import ListItem from '@mui/material/ListItem';

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import Avatar from '@mui/material/Avatar';
import { UserContext } from '../contexts/userContext';

const pages = ['Explore', 'Friends', 'Shelves'];

function SimpleDialog(props) {
  const { user } = useContext(UserContext);
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Account</DialogTitle>
      <List sx={{ p: '1rem' }}>
        <ListItem disableGutters>
          <List>
            <ListItemText
              primary={`User: ${currentUser.firstName} ${currentUser.lastName}`}
              sx={{ display: 'block' }}
            />
            <ListItemText secondary={`Email: ${currentUser.email}`} />
            <ListItemText secondary={`Created at: ${currentUser.createdAt}`} />
          </List>
        </ListItem>
      </List>
    </Dialog>
  );
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const navigate = useNavigate();

  const handleSelectUser = (event) => {
    axios.get(`http://localhost:8001/api/users/${id}`).then((response) => {
      //show user info
      console.log(response.data);
      //display any errors
      setErrorMsg(response.data.result);

      //redirect to user page
      navigate('/user');
    });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
            <img
              src='public/images/Free-Icons-Pack/svg/Free Icons-23.svg'
              alt='library-logo'
              className='logo'
            />
          </Grid>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/explore'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Library
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <a
                    className='home__link--item'
                    href={`/${page.toLowerCase()}`}
                  >
                    <Typography textAlign='center'>{page}</Typography>
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Grid item sx={{ display: { xs: 'flex', md: 'none' } }}>
            <img
              src='/public/images/Free-Icons-Pack/svg/Free Icons-23.svg'
              alt='library-logo'
              className='logo'
            />
          </Grid>{' '}
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/explore'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Library
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={`/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Button onClick={handleDarkModeChange}>
            {darkMode ? <DarkModeOutlinedIcon /> : <Brightness5OutlinedIcon />}
          </Button>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='User' src='' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign='center' onClick={handleClickOpen}>
                  Account
                </Typography>
                <SimpleDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                />
              </MenuItem>
              <MenuItem>
                <Typography textAlign='center' onClick={handleLogout}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
