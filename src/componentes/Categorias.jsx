import React, { useEffect, useState } from 'react';
import { fetchCategorias } from "../funciones/fetch";
import { Link } from 'react-router-dom';
import "../styles/stylesCategorias.css";
import { Box, Flex, Image } from '@chakra-ui/react';

//IMAGENES
import imagenAccion from '../IMG/accion.jpg';
import imagenComedia from '../IMG/comedia.jpg';
import imagenAventura from '../IMG/aventura.jpg';
import imagenAnimación from '../IMG/animacion.jpg';
import imagenDocumental from '../IMG/documental.jpg';
import imagenDrama from '../IMG/drama.jpg';
import imagenFamilia from '../IMG/familiar.jpg';
import imagenCrimen from '../IMG/crimen.jpg';
import imagenFantasía from '../IMG/fantasia.jpg';
import imagenHistoria from '../IMG/historia.jpg';
import imagenMúsica from '../IMG/musica.jpg';
import imagenMisterio from '../IMG/misterio.jpg';
import imagenRomance from '../IMG/romance.jpg';
import imagenCiencia from '../IMG/ciencia.jpg';
import imagenPelitv from '../IMG/telenovela.jpg';
import imagenSuspense from '../IMG/suspense.jpg';
import imagenBélica from '../IMG/guerra.jpg';
import imagenWestern from '../IMG/western.jpg';
import imagenTerror from '../IMG/terror.jpg';

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriaData = await fetchCategorias();
                setCategorias(categoriaData);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    const categoriasImagenes = {
        28: imagenAccion,
        35: imagenComedia,
        12: imagenAventura,
        16: imagenAnimación,
        80: imagenCrimen,
        99: imagenDocumental,
        18: imagenDrama,
        10751: imagenFamilia,
        14: imagenFantasía,
        36: imagenHistoria,
        27: imagenTerror,
        10402: imagenMúsica,
        9648: imagenMisterio,
        10749: imagenRomance,
        878: imagenCiencia,
        10770: imagenPelitv,
        53: imagenSuspense,
        10752: imagenBélica,
        37: imagenWestern
    };

    return (
        <>
            <Flex bg="#1c1c1c" flexWrap="wrap" justifyContent="space-between">
                {categorias.map((categoria) => (
                    <Link key={categoria.id} to={`/categoria/${categoria.id}`}>
                        <Box p="30px" w="400px" h="400px">
                            <Image
                                borderRadius="md"
                                src={categoriasImagenes[categoria.id]}
                                alt={categoria.name} />
                            <Box color="white">
                                {categoria.name}
                            </Box>
                        </Box>
                    </Link>
                ))}
            </Flex>
        </>
    );
}