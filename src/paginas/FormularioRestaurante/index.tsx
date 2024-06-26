import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        axios.post("http://localhost:8000/api/v2/restaurantes/", {
            nome: nomeRestaurante
        })
            .then(() => {
                alert('Restaurante cadastrado com sucesso!')
            })
            .catch(erro => {
                alert(`Erro ao cadastrar. Erro: ${erro}`)
            })
    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField
                value={nomeRestaurante}
                onChange={evento => setNomeRestaurante(evento.target.value)}
                id="outlined-basic"
                label="Nome do restaurante"
                variant="outlined"
            />
            <Button
                type="submit"
                variant="outlined"
            >SALVAR</Button>
        </form>
    )
}

export default FormularioRestaurante;