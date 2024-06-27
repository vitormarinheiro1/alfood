import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import { Link } from 'react-router-dom';
import { Pencil, X } from 'lucide-react';
import http from '../../../http';

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([]);


    useEffect(() => {
        http.get<IPrato[]>("/pratos/")
            .then(resposta => setPratos(resposta.data))
    }, [])

    const excluir = (pratoExcluido: IPrato) => {
        http.delete(`/pratos/${pratoExcluido.id}/`)
            .then(() => {
                const listaPrato = pratos.filter(prato => prato.id !== pratoExcluido.id)
                setPratos([...listaPrato])
            })
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Pratos</TableCell>
                            <TableCell>Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pratos.map(prato =>
                            <TableRow key={prato.id}>
                                <TableCell>{prato.id}</TableCell>
                                <TableCell>{prato.nome}</TableCell>
                                <TableCell>
                                    <Link to={`/admin/pratos/${prato.id}`}>
                                        <Button variant="contained" startIcon={<Pencil />}>
                                            Alterar
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => excluir(prato)}
                                        variant="outlined"
                                        startIcon={<X color='red' />}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdministracaoPratos;