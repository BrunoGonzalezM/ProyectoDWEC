import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, Link } from 'react-router-dom';
import { fetchPersonId, fetchPersonCredits } from '../funciones/fetch';
import { Box, Image, Flex, Text, Button, Divider } from "@chakra-ui/react";
import { traductor } from '../assets/categoriasYTraduccion';
const imgURL = `https://image.tmdb.org/t/p/w500/`;

const config = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
};

export default function Personas() {
    const { id } = useParams();
    const [persona, setPersona] = useState(null);
    const [peliculasPersona, setPeliculasPersona] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllBiography, setShowAllBiography] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [personaData, peliculasPersonaData] = await Promise.all([
                    fetchPersonId(id),
                    fetchPersonCredits(id)
                ]);
                setPersona(personaData);
                setPeliculasPersona(peliculasPersonaData)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString || dateString === "00/00/00") return "Fecha de nacimiento desconocida";

        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('es-ES', { month: 'long' });
        const year = date.getFullYear();

        return `${day} de ${month} de ${year}`;
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {persona && (
                <Flex p="2em" bg="#1C1C1C">
                    <Box flex="1" p="2">
                        <Image
                            src={`${imgURL}${persona.profile_path}`}
                            alt={`Foto de ${persona.name}`}
                            borderRadius="md">
                        </Image>
                        <Text fontSize="24px" mx={5} pt="2em" color="whiteAlpha.900">
                            Información personal
                        </Text>
                        <Text fontSize="20px" mx={5} pt="1em" color="whiteAlpha.900">
                            Conocido por
                        </Text>
                        <Text fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">
                            {persona.known_for_department ? (traductor[persona.known_for_department] || persona.known_for_department) : "No tenemos información en este campo sobre esta persona"}
                        </Text>
                        <Text fontSize="20px" mx={5} pt="1em" color="whiteAlpha.900">
                            Sexo
                        </Text>
                        <Text fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">
                            {persona.gender ? (traductor[persona.gender] || persona.gender) : "Género desconocido"}
                        </Text>
                        <Text fontSize="20px" mx={5} pt="1em" color="whiteAlpha.900">
                            Fecha de nacimiento
                        </Text>
                        <Text fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">
                            {formatDate(persona.birthday)}
                        </Text>
                        <Text fontSize="20px" mx={5} pt="1em" color="whiteAlpha.900">
                            Lugar de nacimiento
                        </Text>
                        <Text fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">
                            {persona.place_of_birth ? persona.place_of_birth : "Lugar de nacimiento desconocido"}
                        </Text>
                        <Text fontSize="20px" mx={5} pt="1em" color="whiteAlpha.900">
                            También conocido como
                        </Text>
                        {persona.also_known_as && persona.also_known_as.length > 0 ? (
                            persona.also_known_as.map((alias, index) => (
                                <Text key={index} fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">
                                    {alias}
                                </Text>
                            ))
                        ) : (
                            <Text fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">
                                No hay información adicional sobre otros nombres conocidos.
                            </Text>
                        )}
                    </Box>
                    <Box flex="3" p="2">
                        <Text fontSize="32px" mx={5} color="whiteAlpha.900" fontWeight="bold">
                            {persona.name}
                        </Text>
                        <Text fontSize="24px" mx={5} pt="1em" color="whiteAlpha.900">
                            Biografía
                        </Text>
                        <Text fontSize="lg" mx={5} pt="1em" color="whiteAlpha.800" noOfLines={showAllBiography ? undefined : 6} pr="4.5em" textAlign="justify">
                            {persona.biography ? persona.biography : "No tenemos información sobre la biografía de esta persona."}
                        </Text>
                        {showAllBiography ? (
                            <Button onClick={() => setShowAllBiography(false)} bg="#CC3344" mt="1em" color="whiteAlpha.900" ml="1em">
                                LEER MENOS
                            </Button>
                        ) : (
                            <Button onClick={() => setShowAllBiography(true)} bg="#CC3344" mt="1em" color="whiteAlpha.900" ml="1em">
                                LEER MÁS
                            </Button>
                        )}
                        <Divider pt="2.5em" />
                        <Text fontSize="24px" mx={5} pt="1em" color="whiteAlpha.900">Participó en</Text>
                        <Flex flexWrap="wrap" justifyContent="flex-start">
                            <Slider {...config}>
                                {peliculasPersona.cast && peliculasPersona.cast.slice(0, 5).map((pelicula, index) => (
                                    <Box key={index} m="1em" w="100em">
                                        <Link to={`/pelicula/id/${pelicula.id}`} >
                                            <Image
                                                src={`${imgURL}${pelicula.poster_path}`}
                                                alt={`Póster de ${pelicula.title}`}
                                                borderRadius="md"
                                                w="10em"
                                            />
                                            <Text fontSize="18px" pt="0.5em" color="whiteAlpha.800" textAlign="center" w="9em" noOfLines={2}>
                                                {pelicula.title}
                                            </Text>
                                        </Link>
                                    </Box>
                                ))}
                            </Slider>

                        </Flex>
                    </Box>
                </Flex>
            )}
        </>
    );
}
