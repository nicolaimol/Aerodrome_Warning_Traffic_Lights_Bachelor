import React, {useEffect, useState} from 'react';
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {slettTerskel} from "../util/terskel";
import {useKeycloak} from "@react-keycloak/web";
import {Button} from "@mui/material";


interface Column {
    id: 'id' | 'icao' | 'updateAt' | 'createAt' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

interface Data {
    id: string,
    icao: string,
    updateAt: string,
    createAt: string,
}

const columns: readonly Column[] = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'icao', label: 'Icao', minWidth: 100 },
    {
        id: 'updateAt',
        label: 'Last Updated',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'createAt',
        label: 'Created',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'delete',
        label: 'Slett terskel',
        minWidth: 170,
        align: 'right',
    }
];

function createData(
    id: string,
    icao: string,
    updateAt: string,
    createAt: string,
): Data {
    return {
        id,
        icao,
        updateAt,
        createAt,
    };
}

function TerskelList(props: any) {

    const keycloak = useKeycloak()

    const [rows, setRows] = useState<Data[]>([])

    useEffect(() => {

        const terskelList = props.list.sort((a:any, b:any) => {
            if (a.updateAt < b.updateAt) {
                return 1
            } else if (a.updateAt > b.updateat) {
                return -1
            }
            return 0
        })

        setRows(terskelList.map((it: any) => {
            return createData(
                it.id,
                it.flyplass.icao,
                new Date(it.updateAt).toLocaleString(),
                new Date(it.createAt).toLocaleString()
            )
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

    const slett = async (id: string) => {
        const response = await slettTerskel(id, keycloak.keycloak.token!!)
        if (response == 200) {
            props.update(id)
        }
    }


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer style={{ height: "calc(100vh - 123px)"}}>
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
                                            if (column.id != "delete") {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            } else {
                                                return (

                                                    <TableCell key={column.id} align={column.align}>
                                                        <Button onClick={() => slett(row.id)} >
                                                            Slett
                                                        </Button>
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
        </Paper>
    );
}

export default TerskelList;