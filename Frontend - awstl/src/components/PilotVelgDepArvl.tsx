import { TextField, Typography } from '@mui/material'
import React, {useState} from 'react'
import { ThemeProvider, styled } from '@mui/material/styles';
import { theme } from '../util/theme'


const CustomTextFieldTimeInput = styled(TextField)({
  input:{
    color: '#0090a8',
  },
  label:{
    color: '#0090a8',
  },
  '& label.Mui-focused': {
    color: '#0090a8',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0090a8',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#0090a8',
    },
    '&:hover fieldset': {
      borderColor: '#496c80',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0090a8',
    },
  },
});

function PilotVelgDepArvl(props: any) {

  // Denne logikken setter klokkeslett alltid til nærmeste halvtime framover i tid

  const dateNow = new Date().toLocaleString();
  const tidNow = dateNow.split(' ')[1].split(':')[0] + ':' + dateNow.split(' ')[1].split(':')[1]

  let minutt:string = tidNow.split(':')[1];
  let tilTime:string = tidNow.split(':')[0];

  if (+minutt <= 30){
    minutt = '30';
  } else {
    minutt = '00';
    if (tilTime === '23'){
      tilTime = '00';
    } else {
      tilTime = (+tilTime + 1).toString()
      if (tilTime.split('').length > 2){
        tilTime = '0' + tilTime;
      }
    }
  }

  const ankomstTime = (+tilTime === 23) ? '00' : (+tilTime < 9) ? ('0' + (+tilTime + 1).toString()) : (+tilTime + 1).toString();
  const printAnkomstTid = ankomstTime + ':' + minutt;

  const printTid = tilTime + ':' + minutt;

  const [fra, setFra] = useState<string>(printTid)
  const [til, setTil] = useState<string>(printAnkomstTid)

  const handleEndretTidFra = (event: any) => {
    setFra(event.target.value as string)
    props.updateFra(event.target.value as string)
  }

  const handleEndretTidTil = (event: any) => {
  setTil(event.target.value as string)
    props.updateTil(event.target.value as string)
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column wrap', textAlign: 'center'}}>
        <Typography sx={{ mb: 3 }} variant='h5' color='primary'>
          Velg tidspunkt for avgang og ankomst
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap'}}>
          <CustomTextFieldTimeInput
            id="time"
            label="Avgang"
            type="time"
            onChange={handleEndretTidFra}
            value={fra}
            InputLabelProps={{
            shrink: true,
            }}
            inputProps={{
            step: 300, // 5 min
            }}
            sx={{ width: 150, mb: 5 }}
          />
          <CustomTextFieldTimeInput 
            id="time"
            label="Ankomst"
            type="time"
            onChange={handleEndretTidTil}
            value={til}
            InputLabelProps={{
            shrink: true,
            }}
            inputProps={{
            step: 300, // 5 min
            }}
            sx={{ width: 150, mb: 5 }}
          />
        </div>
      </div>
    </ThemeProvider>
    </>
  )
}

export default PilotVelgDepArvl