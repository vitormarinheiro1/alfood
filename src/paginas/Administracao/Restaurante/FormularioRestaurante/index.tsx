import { Box, Button, Container, TextField, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../../interfaces/IRestaurante";
import http from "../../../../http";

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
        <Box>
            <Container maxWidth="lg" sx={{ mt: 1 }}>
                <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                        <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
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
                </Paper>
            </Container>
        </Box>
    )
}

export default FormularioRestaurante;
