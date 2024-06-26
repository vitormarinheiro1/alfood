import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import { ArrowLeft  } from "lucide-react";

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {

        if (parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante alterado com sucesso!')
                })
                .catch(erro => {
                    alert(`Erro ao alterar. Erro: ${erro}`)
                })
        } else {
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


        evento.preventDefault()
    }

    return (
        <>
            <Link to={`/admin/restaurantes/`}>
                <Button variant="contained" startIcon={<ArrowLeft  />}>
                    Voltar
                </Button>
            </Link>
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
        </>
    )
}

export default FormularioRestaurante;