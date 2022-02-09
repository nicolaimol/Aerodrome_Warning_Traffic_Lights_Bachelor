import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function Testinputs() {

    const [input1, setI1] = useState("");
    const [input2, setI2] = useState("");
    const [input3, setI3] = useState("");
    const [respons, setrespons] = useState("");

    let handleSubmit = async (e: { preventDefault: () => void; }) => {

        try {
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
      };

  return <Card sx={{ maxWidth: 345 }}>
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      Hear ye Hear ye 'tis but an input test
    </Typography>
    <Typography variant="body2" color="text.secondary">
    <TextField id="outlined-basic" label="Required" variant="outlined" required value={input1} onChange={(e) => setI1(e.target.value)}/>
    <TextField id="filled-basic" label="Regn" variant="filled" value={input2} onChange={(e) => setI2(e.target.value)} />
    <TextField id="standard-basic" label="Temperatur" variant="standard" value={input3} onChange={(e) => setI3(e.target.value)}/>
    </Typography>
  </CardContent>
  <CardActions>
    <Button onClick={handleSubmit} size="small">Send</Button>
  </CardActions>
</Card>;
}

export default Testinputs;

