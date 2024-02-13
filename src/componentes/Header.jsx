import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Image, Flex, Button, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { fetchBusqueda } from "../funciones/fetch";
import logo from '../IMG/Logo.png';
import '../styles/styleHeader.css';

const links = [
    {
        name: 'Inicio',
        href: '/inicio',
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
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    // Si estamos en la página de inicio de sesión, no renderizamos el Header
    if (isLoginPage) {
        return null;
    }
    const [busqueda, setBusqueda] = useState('');

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
                <Image src={logo} alt='Logo' h="100%" aspectRatio="4/4" filter="invert(1)" p="0.5em" mx="1em "></Image>

                <Flex
                    listStyleType="none"
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
                            >
                                {link.name}
                            </button>
                        </Link>
                    ))}
                </Flex>

                <Flex
                    transition="0.4s"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Input
                        onChange={handleChange}
                        value={busqueda}
                        placeholder='Busca tu película favorita!'
                        _placeholder={{ color: 'white' }}
                        textColor="white"
                        focusBorderColor='red.800'
                        variant='flushed'
                        textTransform="uppercase"
                        w="16em"
                    />
                    <Link to={`/peliculas/search/${busqueda.trim()}`}>
                        <Button
                            bg="transparent"
                            border="none"
                            cursor="pointer"
                            _hover={{ bg: "transparent", color: "red" }}
                        >
                            <SearchIcon color="white" boxSize="8" />
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Box >
    );
};

export default Header;
