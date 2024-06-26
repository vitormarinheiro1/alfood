import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import { Link } from 'react-router-dom';
import { Plus, Pencil, X, ArrowLeft } from 'lucide-react';

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);


    useEffect(() => {
        axios.get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const excluir = (restauranteExcluido: IRestaurante) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id)
                setRestaurantes([...listaRestaurante])
            })
    }

    return (
        <>
            <h1>Administração Restaurante</h1>
            <Link to={`/`}>
                <Button
                    sx={{ marginRight: 1 }}
                    variant="contained"
                    startIcon={<ArrowLeft />}
                >
                    Voltar
                </Button>
            </Link>
            <Link to={`/admin/restaurantes/novo`}>
                <Button variant="contained" color="success" startIcon={<Plus />}>
                    Adicionar
                </Button>
            </Link>
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