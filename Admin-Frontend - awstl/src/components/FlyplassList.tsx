import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import {Link} from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmDialog from "./ConfirmDialog";
import {slettFlyplass} from "../util/flyplass";
import {useKeycloak} from "@react-keycloak/web";

interface Column {
    id: 'icao' | 'navn' | 'iata' | 'rwy' | 'lat' | 'lon' | 'altitude' | 'velg' | 'slett';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'icao', label: 'Icao', minWidth: 170 },
    { id: 'navn', label: 'Navn', minWidth: 100 },
    {
        id: 'iata',
        label: 'Iata',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'rwy',
        label: 'Runway',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'lat',
        label: 'Latitude',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'lon',
        label: 'Longitude',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'altitude',
        label: 'Altitude',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'velg',
        label: 'Velg',
        minWidth: 170,
    },
    {
        id: 'slett',
        label: 'Slett'
    }
];

interface Data {
    icao: string,
    navn: string,
    iata: string,
    rwy: string,
    lat: string,
    lon: string,
    altitude: string
}

function createData(
    icao: string,
    navn: string,
    iata: string,
    rwy: string,
    lat: string,
    lon: string,
    altitude: string
): Data {
    return {
        icao,
        navn,
        iata,
        rwy,
        lat,
        lon,
        altitude
    };
}

export default function FlyplassList(props: any) {

    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [slettIcao, setSlettIcao] = useState<string>("")

    const keycloak = useKeycloak()

    const setFlyplass = (flyplass: Data) => {
        props.changeFlyplass(flyplass)
    }

    const slett = (icao: string) => {

        setSlettIcao(icao)
        setConfirmOpen(true)


    }

    const confirm = async () => {

        const status = await slettFlyplass(slettIcao, keycloak.keycloak.token!!)

        if (status === 200) {
            props.slett(slettIcao)
            return
        }

        alert(`Error with code ${status}`)
    }

    const [rows, setRows] = useState<Data[]>([{icao: "ENGM", navn: "Gardermoen", iata: "OSL", rwy: "01/19", lat: "60", lon: "10", altitude: "100"}])

    useEffect(() => {

        const flyplasser = props.list.sort((a:any, b:any) => {
            if (a.navn < b.navn) {
                return -1
            } else if (a.navn > b.navn) {
                return 1
            }
            return 0
        })

        setRows(flyplasser.map((it: any) => {
            return createData(it.icao, it.navn, it.iata, it.rwy, it.lat, it.lon, it.altitude)
        }))

    }, [props])


    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
        <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <TableContainer style={{ height: "calc(100vh - 123px)" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    //style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.icao}>
                                        {columns.map((column) => {
                                            if (column.id != 'velg' && column.id != 'slett') {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            } else if (column.id == 'slett') {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Button startIcon={<DeleteOutlineIcon />} onClick={() => slett(row.icao)} variant="text" color="error">Slett</Button>
                                                    </TableCell>
                                                )
                                            } else {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Button onClick={() => setFlyplass(row)} variant="text">Endre</Button>
                                                    </TableCell>

                                                )
                                            }

                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Link to="/flyplass/ny" style={{position: 'absolute', left: '.5em', bottom: '.5em'}} >
                <Button variant="outlined" endIcon={<Add />}>Ny</Button>
            </Link>
        </Paper>
            <div>
                <ConfirmDialog
                    title={`Er du sikker på at du vil slette ${slettIcao}?`}
                    onConfirm={confirm}
                    setOpen={setConfirmOpen}
                    open={confirmOpen} />
            </div>
        </>
    );
}