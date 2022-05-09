import React from 'react';
import axios from 'axios'
import {
    useEffect,
    useState
} from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Typography} from '@mui/material'


function TafMetar(props: any) {

    const url = `/api/tafmetar?icao=${props.icao}`
    const [tafmetar, setTafmetar] = useState<any>(null)

    function createData(name: string, value: any) {
        return { name, value};
    }

    const rows = [
        createData('Taf', tafmetar?.taf),
        createData('Metar', tafmetar?.metar),

    ];
    
    useEffect(() => {
        axios.get(url)
            .then((response: any) => {
                setTafmetar(response.data)
            })
            .catch((error:any) => {
                console.log(error.response)
                if (error.response.status === 400) {
                    setTafmetar(null)
                }
            })
    }, [props])

    return (
        <div>
            { tafmetar != null &&
                <TableContainer style={props.styles !== undefined ? props.styles: {}} elevation={0} component={Paper}>
                    <Table >
                        <TableBody>
                            {
                                rows.map((row: any) => (
                                    <TableRow key={row.name}  >
                                        <TableCell style={props.styles !== undefined ? props.styles : {} } component="th" scope="row" >{row.name}</TableCell>
                                        <TableCell style={props.styles !== undefined ? props.styles : {} }>{row.value}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            { tafmetar == null &&
                <Typography style={props.styles !== undefined ? props.styles : {} } variant="h6">
                    Taf og metar er ikke tilgjengelig
                </Typography>
            }
        </div>
    );
}

export default TafMetar;