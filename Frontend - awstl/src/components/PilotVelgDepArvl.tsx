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

  const [fra, setFra] = useState<string>("07:30")
  const [til, setTil] = useState<string>("07:30")

  const handleEndretTidFra = (event: any) => {
    setFra(event.target.value as string)
    props.updateFra(event.target.value as string)
  }

  const handleEndretTidTil = (event: any) => {
  setTil(event.target.value as string)
    console.log(event.target.value)
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