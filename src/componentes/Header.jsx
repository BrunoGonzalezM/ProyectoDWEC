import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styleHeader.css';
import { Box, Image, Flex, Button, Input } from '@chakra-ui/react';
import logo from '../IMG/MovieWorld logo.png';
import { SearchIcon } from '@chakra-ui/icons';

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

                            <Flex px="1em"
                                w="maxcontent"
                                h="70px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="26"
                                transition="0.4s"
                                _hover={{ bg: "#660015", color: "#fff", fontSize: "30px" }}
                            >
                                {link.name}
                            </Flex>
                        </Link>

                    ))}
                </Flex>

                <Flex
                    transition="0.4s"
                    _hover={{ bg: "#660015" }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Button
                        bg="transparent"
                        border="none"
                        cursor="pointer"
                        _hover={{ bg: "transparent", color: "#fff" }}
                    >
                        <SearchIcon boxSize="8"></SearchIcon>
                    </Button>
                </Flex>
            </Flex>
        </Box >
    );
};

export default Header;
