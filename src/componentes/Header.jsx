import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Flex, Button, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { fetchBusqueda } from "../funciones/fetch";
import logo from '../IMG/MovieWorld logo.png';
import '../styles/styleHeader.css';

const links = [
    {
        name: 'Inicio',
        href: '/',
    },
    {
        name: 'Películas',
        href: '/peliculas',
    },
    {
        name: 'Series',
        href: '/series',
    },
    {
        name: 'Categorías',
        href: '/categorias',
    },
];

const Header = () => {
    const [busqueda, setBusqueda] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState();
    // const buscarPelicula = () => {
    //     setLoading(true);
    //     setError(null);
    //     fetchBusqueda(busqueda)
    //         .then((movies) => {
    //             setMovies(movies);
    //             console.log("Se busca :" + busqueda)
    //             console.log(movies);
    //         })
    //         .catch((err) => {
    //             setError(err.message);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // };

     const handleChange = (e) => {
         setBusqueda(e.target.value);
     };

    return (
        <Box
            m="0"
            p="0"
            bg="black"
            fontFamily={"kanit, sans-serif"}
            fontWeight={700}
        >
            <Flex
                h="70px"
                bg="#CC3344"
                alignItems="center"
                justifyContent="space-between"
            >
                <Image src={logo} alt='Logo' w="106px" p="0" m="0"></Image>

                <Flex listStyleType="none"
                    m="0"
                    p="0"
                    display="flex"
                    transition={{ color: '0.3s', fontSize: '0.3s' }}
                >
                    {links.map((link) => (
                        <Link key={link.name} to={link.href}>
                            <button className='button' px="1em"
                                w="maxcontent"
                                h="70px"
                                display="flex"
                                align-items="center"
                                justify-content="center"
                                fontSize="26"
                                transition="0.4s"
                                _hover={{ bg: "#660015", color: "#fff", fontSize: "30px" }}
                            >
                                {link.name}
                            </button>
                        </Link>
                    ))}
                </Flex>
                <Input
                    onChange={handleChange}
                    value={busqueda}
                    placeholder='Busca tu película favorita!'
                />
                <Flex
                    transition="0.4s"
                    _hover={{ bg: "#660015" }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Link to={`/peliculas/search/${busqueda}`}>
                        <Button
                            bg="transparent"
                            border="none"
                            cursor="pointer"
                            _hover={{ bg: "transparent", color: "#fff" }}
                            // onClick={buscarPelicula}
                        >
                            <SearchIcon boxSize="8" />
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Box >
    );
};

export default Header;
