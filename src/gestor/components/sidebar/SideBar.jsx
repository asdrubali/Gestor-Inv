import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../hooks';
import { DragHandle, Logout, Dashboard,MoreVert, KeyboardArrowLeft, Inventory } from '@mui/icons-material';
import { 
  Box, 
  Button, 
  CssBaseline, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  Menu, 
  MenuItem, 
  Stack, 
  Toolbar, 
  Tooltip, 
  Typography } from '@mui/material';

const sideBarItems = [
  {
    name: 'Dasboard',
    path: 'gestor/dashboard',
    icon: <Dashboard/>
  },
  {
    name: 'Inventario',
    path: 'gestor/inventario',
    icon: <Inventory/>
  }
];

const settings = ['DarkMode'];

export const SideBar = ({ widthOpen1 = 220, widthClosed2 = 60 }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { startLogout, user } = useAuthStore();
  const drawerRef = useRef(null);
  const [anchorElSeting, setAnchorElSeting] = useState(null);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenSettings = (event) => {
    setAnchorElSeting(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorElSeting(null);
  };

  const handleClickOutsideDrawer = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const activeItem = sideBarItems.findIndex(item => window.location.pathname.split('gestor/')[1] === item.path.split('gestor/')[1]);
    setActiveIndex(activeItem);
  }, [location]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDrawer);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDrawer);
    };
  }, []);

  const drawerStyle = {
    width: open ? widthOpen1 : widthClosed2,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: open ? widthOpen1 : widthClosed2,
      transition: 'width 0.3s ease-in-out',
      overflow: 'hidden',
      boxSizing: "border-box",
      borderRight: "0px",
      backgroundColor: 'primary.main',
      color: 'primary.contrastText',
    }
  };

  return (
    <>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={drawerStyle}
        ref={drawerRef}
      >
        <Toolbar
          sx={{
            minHeight:'60px !important',
            p: '0 !important',
          borderBottom: '.5px solid rgba(204, 204, 204, .4)'
          }}
        >
          {/* <Box sx={{ flexGrow: 0, display: open ? '' : 'none' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenSettings} sx={{ p: 0 }}>
                <MoreVert alt="Remy Sharp" sx={{ color: 'primary.contrastText' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '25px', ml: '-5px' }}
              id="menu-appbar"
              anchorEl={anchorElSeting}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElSeting)}
              onClose={handleCloseSettings}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseSettings}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          <Typography
            variant="body2"
            noWrap
            color='primary.contrastText'
            fontSize='16px'
            ml='10%'
            display={open ? '' : 'none'}
          >
            {user.name}
          </Typography>
          <IconButton
            color="inherit"
            aria-label={open ? "close drawer" : "open drawer"}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{
              margin: open ? '' : 'auto',
              marginLeft: open ? 'auto' : '',
            }}
          >
            {open ? <KeyboardArrowLeft /> : <DragHandle />}
          </IconButton>

        </Toolbar >
        <List disablePadding>
          <Toolbar sx={{ marginBottom: "20px" }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="center"
              height='100%'
            >
            </Stack>
          </Toolbar>
          {sideBarItems.map((item, index) => (
            <ListItemButton
              key={`siderbar-key-${index}`}
              selected={index === activeIndex}
              component={Link}
              to={item.path}
              onClick={ handleDrawerClose }
              sx={{
                color: (index === activeIndex) ? 'customColor.hoverLight' : 'primary.contrastText',
                "&:hover": {
                  backgroundColor: 'primary.light'
                },
                paddingY: "12px",
                paddingX: "1rem"
              }}
            >
              <ListItemIcon
                className='item-sidebar'
                sx={{
                  color:'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {item.name}
            </ListItemButton>
          ))}
        </List>
        {!open && (
          <Button
            onClick={startLogout}
            sx={{
              marginTop: 'auto',
            }}
          >
            <Logout sx={{ color: 'error.main', fontSize: '30px' }} />
          </Button>
        )}
        <Button
          onClick={startLogout}
          sx={{
            marginTop: 'auto',
            display: open ? '' : 'none'
          }}
        >
          <Typography
            width='100%'
            color='error.main'
            fontSize='1.2rem'
            textAlign='center'
          >
            Salir
          </Typography>
        </Button>
      </Drawer>
    </>
  );
};
