import * as React from 'react';
import {Link} from 'react-router-dom'
import MetLogo from '../media/met-logo.svg';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Hjem', "Flyplass", "Rute", "Kart"]; // Legg til alle menu-items her
const links = new Map();
links.set("Hjem", "/")
links.set("Flyplass", "/flyplass")
links.set("Rute", "/rute")
links.set("Kart", "/kart")



const Navbar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ background: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters> {/* Logo for burgermeny */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link style={{ paddingTop: 3 }} to={links.get('Hjem')}><img src={MetLogo} alt="Met logo"/></Link>
          </Typography>

          {/* Denne boksen håndterer navigasjonsbaren for burgermeny */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#0090a8' }}
            >
              <MenuIcon /> {/* Burger ikonet */}
            </IconButton>
            <Menu
              id="menu-appbar"
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
                display: { xs: 'block', md: 'none'}
              }}
            >
              {pages.map((page) => ( // Setter alle linkene inn i menyen
                <Link style={{ color: '#0090a8' }} to={links.get(page)} key={page}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Meny uten burgermeny */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link style={{ paddingTop: 5 }} to={links.get('Hjem')}><img src={MetLogo} alt="Met logo"/></Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => ( // Setter alle linkene inn i menyen for desktop
              <Link key={page} to={links.get(page)}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#0090a8', display: 'block' }}
              >
                {page}
              </Button></Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;