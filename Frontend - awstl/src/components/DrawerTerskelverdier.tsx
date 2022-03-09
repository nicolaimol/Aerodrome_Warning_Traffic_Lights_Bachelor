import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Button, SwipeableDrawer } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'
import axios from  'axios'
import { useDispatch, useSelector } from 'react-redux'

import TerskelForm from './TerskelForm';
import allActions from '../Actions';


function DrawerTerskelverdier() {

    type Anchor = 'left'

    const [state, setState] = React.useState({
        left: false
    })

    let url = ""
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        if (process.env.REACT_APP_URL_ENV == "prod") {
            url = "/api/terskel"
        }
        else {
            url = "http://localhost:8080/api/terskel"
        }
    } else {
        url = "/api/terskel"
    }

    const formVerdier = useSelector((state: any) => state.terskel.value)
    const airport = useSelector((state: any) => state.airport.value)

    const dispatch = useDispatch()

    const update = () => {
        dispatch(allActions.terskelActions.setTerskel(formVerdier))

        const obj = formVerdier

        obj.flyplass = airport

        console.log(obj)

        axios.post(url, obj)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

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

      if (!open) {
          update()
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
                <h2 style={{color:"#0090a8"}}>Sett terskelverdier her</h2>
            </div>
            <Divider />
            <div style={{ marginLeft: 0}}>
                <TerskelForm />
            </div>
          
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