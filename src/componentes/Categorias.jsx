import React, { useEffect, useState } from 'react';
import { fetchCategorias } from "../funciones/fetch";
import { Link } from 'react-router-dom';
import { Box, Flex, Image } from '@chakra-ui/react';
import { categoriasImagenes } from '../assets/categorias';
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

    return (
        <>
            <Flex bg="#1c1c1c" flexWrap="wrap" justifyContent="space-between">
                {categorias.map((categoria) => (
                    <Link key={categoria.id} to={`/categoria/${categoria.id}`}>
                        <Box p="30px" w="400px" h="400px">
                            <Image
                                borderRadius="md"
                                src={categoriasImagenes[categoria.id][1]}
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