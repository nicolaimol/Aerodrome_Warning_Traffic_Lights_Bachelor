import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import { useDispatch } from 'react-redux'
import allActions from '../Actions';
import iInput from '../model/input';
//import iInputAction from '../model/actions/inputAction';
import { MenuItem, InputLabel, Select, SelectChangeEvent, FormControl } from '@mui/material';
import Box from '@mui/system/Box';

function Testinputs() {

  // Kode for input flyplasstest

  const [flyplass, setFlyplass] = React.useState('');
  const handleFlyplassChange = (event: SelectChangeEvent) => {
    setFlyplass(event.target.value as string);
  }


  // Kode for input test

    const dispatch = useDispatch();

    const [input1, setI1] = useState("");
    const [input2, setI2] = useState("");
    const [input3, setI3] = useState("");
    const [respons, setrespons] = useState("");

    let handleSubmit = async (e: { preventDefault: () => void; }) => {
        /**
         * try {
          let res = await fetch("", {
            method: "POST",
            body: JSON.stringify({
              input1: input1,
              input2: input2,
              input3: input3,
            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setI1("");
            setI2("");
            setI3("");
          } else {
            setrespons("en error");
          }
        } catch (err) {
          console.log(err);
        }
        */
            const body: iInput = {
              input1: input1, 
              input2: input2,
              input3: input3
            }
            axios.post('/api/input', body)
            .then((response:any) => {
              console.log(response.data);
              //dispatch(allActions.inputActions.setInput(response.data));
            })
            .catch((err) => {
                console.log(err);
            });
        
      };

  return (
      <div style={{"width": "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Hear ye Hear ye 'tis but an input test
            </Typography>
            <Typography variant="body2" color="text.secondary">

            </Typography>
                          <TextField id="outlined-basic" label="Required" variant="outlined" required value={input1} onChange={(e) => setI1(e.target.value)}/>
              <TextField id="filled-basic" label="Regn" variant="filled" value={input2} onChange={(e) => setI2(e.target.value)} />
              <TextField id="standard-basic" label="Temperatur" variant="standard" value={input3} onChange={(e) => setI3(e.target.value)}/>
          </CardContent>
          <CardActions>
            <Button onClick={handleSubmit} size="small">Send</Button>
          </CardActions>
        </Card>

        {/* 'velg flyplass' boks */}
        <Box sx={{ m: 1, minWidth: 150 }}>
          <FormControl fullWidth>
              <InputLabel id="selectFlyplassLabel">Velg flyplass</InputLabel>
              <Select
                labelId="selectFlyplassLabel"
                id="selectFlyplass"
                value={flyplass}
                label="Flyplass"
                onChange={handleFlyplassChange}
                >
                <MenuItem value={10}>Gardermoen</MenuItem> {/* Skal selvfølgelig hentes fra backend */}
                <MenuItem value={20}>Torp</MenuItem>
                <MenuItem value={30}>Sola</MenuItem>
              </Select>
            </FormControl>
        </Box>
        
      </div>
        )
        }

export default Testinputs;

