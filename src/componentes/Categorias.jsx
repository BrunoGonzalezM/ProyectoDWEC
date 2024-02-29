import React, { useEffect, useState } from 'react';
import { fetchCategorias } from "../services/fetch";
import { Link } from 'react-router-dom';
import { Box, Flex, Text} from '@chakra-ui/react';
import { categoriasImagenes } from '../assets/categoriasYTraduccion';
import "../styles/styleCategory.css";
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
            <Flex bg="#1c1c1c" flexWrap="wrap" justifyContent="center" gap="6em" p="3em">
                {categorias.map((categoria) => (
                    <Link key={categoria.id} to={`/categoria/${categoria.id}`}>
                        <Box className="flip-card">
                            <Box className="flip-card-inner">
                                <Box className="flip-card-front" 
                                    backgroundImage={`url(${categoriasImagenes[categoria.id][1]})`}
                                    backgroundPosition="top"
                                    backgroundSize="cover"
                                    backgroundRepeat="no-repeat"
                                    overflow='hidden'
                                    >
                                <Box
                                    backgroundColor='rgb(0,0,0,.5)'
                                    height='100%'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    <p className="title">{categoria.name}</p>
                                </Box>
                                </Box>
                                <Box className="flip-card-back">
                                    <Text m="0 auto" className="title" pb="1em">{categoria.name}</Text>
                                    <Text noOfLines={6} className="text">{categoriasImagenes[categoria.id][2]}</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Link>
                ))}
            </Flex>
        </>
    );
}