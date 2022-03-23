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


function TafMetar(props: any) {

    const url = `/api/tafmetar?icao=${props.icao}`
    const [tafmetar, setTafmetar] = useState<any>(null)

    useEffect(() => {
        axios.get(url)
            .then((response: any) => {
                setTafmetar(response.data)
            })
    }, [props])

    function createData(name: string, value: any) {
        return { name, value};
    }

    const rows = [
        createData('Taf', tafmetar?.taf),
        createData('Metar', tafmetar?.metar),

    ];

    return (
        <div>
            <TableContainer component={Paper}>
                <Table >
                    <TableBody>
                        {
                            rows.map((row: any) => (
                                <TableRow key={row.name} >
                                    <TableCell component="th" scope="row" >{row.name}</TableCell>
                                    <TableCell>{row.value}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TafMetar;