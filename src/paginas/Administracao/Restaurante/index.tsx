import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import { Link } from 'react-router-dom';
import { Pencil, X } from 'lucide-react';
import http from '../../../http';

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);


    useEffect(() => {
        http.get<IRestaurante[]>("/restaurantes/")
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const excluir = (restauranteExcluido: IRestaurante) => {
        http.delete(`/restaurantes/${restauranteExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id)
                setRestaurantes([...listaRestaurante])
            })
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Restaurantes</TableCell>
                            <TableCell>Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurantes.map(restaurante =>
                            <TableRow key={restaurante.id}>
                                <TableCell>{restaurante.id}</TableCell>
                                <TableCell>{restaurante.nome}</TableCell>
                                <TableCell>
                                    <Link to={`/admin/restaurantes/${restaurante.id}`}>
                                        <Button variant="contained" startIcon={<Pencil />}>
                                            Alterar
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => excluir(restaurante)}
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

export default AdministracaoRestaurantes;