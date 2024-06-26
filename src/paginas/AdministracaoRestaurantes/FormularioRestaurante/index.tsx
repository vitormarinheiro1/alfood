import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import { ArrowLeft } from "lucide-react";
import http from "../../../http";

const FormularioRestaurante = () => {

    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        if (parametros.id) {
            http.put(`/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante alterado com sucesso!')
                })
                .catch(erro => {
                    alert(`Erro ao alterar. Erro: ${erro}`)
                })
        } else {
            http.post("/restaurantes/", {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso!')
                })
                .catch(erro => {
                    alert(`Erro ao cadastrar. Erro: ${erro}`)
                })
        }
        evento.preventDefault()
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box component="form" onSubmit={aoSubmeterForm}>
                <Link to={`/admin/restaurantes/`}>
                    <Button
                        sx={{ marginTop: 5, marginBottom: 2 }}
                        variant="contained"
                        startIcon={<ArrowLeft />}
                    >
                        Voltar
                    </Button>
                </Link>
                <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                <TextField
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    id="outlined-basic"
                    label="Nome do restaurante"
                    variant="outlined"
                    fullWidth
                    required
                />
                <Button
                    sx={{ marginTop: 1 }}
                    type="submit"
                    variant="outlined"
                    fullWidth
                >
                    SALVAR
                </Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante;
