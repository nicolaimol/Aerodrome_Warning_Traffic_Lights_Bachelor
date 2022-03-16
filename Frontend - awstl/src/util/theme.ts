import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink, red } from '@mui/material/colors';

export const theme = createTheme({

    /***
 * Fargepalett!!!
 * 
 * Blå skrift: #0090a8
 * Bakgrunn: #dff2f6
 * Mørkeblå kort: #0494ac
 * Footer: #496c80
 */


    palette: {
        primary: {
            light: '#dff2f6',
            main: '#0090a8',
            dark: '#0494ac',
            contrastText: 'white'
        },
        secondary: pink,
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});
