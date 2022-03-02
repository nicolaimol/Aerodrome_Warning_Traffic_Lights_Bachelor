import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Button, SwipeableDrawer } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'

import TerskelForm from './TerskelForm';

function DrawerTerskelverdier() {

    type Anchor = 'left'

    const [state, setState] = React.useState({
        left: false
    })

    const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <Box
          sx={{ minWidth: 300, width: '50vw' }}
          role="presentation"
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{ marginLeft: '25px'}}>
                <h2>Sett terskelverdier her</h2>
            </div>
            <Divider />
            <div style={{ marginLeft: '25px'}}>
                <TerskelForm />
            </div>
          
          <Divider />
          
        </Box>
      );


  return (
    <>
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><SettingsIcon /></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
    </>
  )
}

export default DrawerTerskelverdier