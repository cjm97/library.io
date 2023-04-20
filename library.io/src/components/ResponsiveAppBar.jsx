import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Brightness5OutlinedIcon from '@mui/icons-material/Brightness5Outlined';

const pages = ['Explore', 'Friends', 'Reading', 'To Read', 'Read'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Grid item sx={{ display: { xs: 'none', md: 'flex' } }}>
            <img
              src='/public/images/Free-Icons-Pack/svg/Free Icons-23.svg'
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
              {pages.map((page) => {
                if (page === 'To Read') {
                  return (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <a className='home__link--item' href='/toread'>
                        <Typography textAlign='center'>{page}</Typography>
                      </a>
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <a
                        className='home__link--item'
                        href={`/${page.toLowerCase()}`}
                      >
                        <Typography textAlign='center'>{page}</Typography>
                      </a>
                    </MenuItem>
                  );
                }
              })}
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
            variant='h5'
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
            {pages.map((page) => {
              if (page === 'To Read') {
                return (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    href='/toread'
                  >
                    {page}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={page}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    href={`/${page.toLowerCase()}`}
                  >
                    {page}
                  </Button>
                );
              }
            })}
          </Box>
          <Button onClick={handleDarkModeChange}>
            {darkMode ? <DarkModeOutlinedIcon /> : <Brightness5OutlinedIcon />}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
