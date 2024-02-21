import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { useParams, Link } from 'react-router-dom';
import { fetchPersonId, fetchPersonCredits } from '../funciones/fetch';
import { Box, Image, Flex, Text, Button, Divider } from "@chakra-ui/react";
import { traductor } from '../assets/categoriasYTraduccion';
import Tarjeta from './Tarjeta';
import nofoundimg from "../assets/nofoundimg.png"
const imgURL = `https://image.tmdb.org/t/p/w500/`;

export default function Personas() {
    const { id } = useParams();
    const [persona, setPersona] = useState(null);
    const [peliculasPersona, setPeliculasPersona] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

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
        if (!dateString || dateString === "00/00/00") return "Fecha desconocida";

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
                            src={persona.profile_path ? `${imgURL}${persona.profile_path}` : nofoundimg}
                            alt="Imagen de perfil" borderRadius="md"
                        />
                        <Text fontSize="24px" mx={5} pt="2em" color="whiteAlpha.900"> Información personal </Text>
                        {[
                            { label: 'Conocido por', value: persona.known_for_department ? (traductor[persona.known_for_department] || persona.known_for_department) : "-" },
                            { label: 'Sexo', value: persona.gender ? (traductor[persona.gender] || persona.gender) : "-" },
                            { label: 'Fecha de nacimiento', value: formatDate(persona.birthday ? persona.birthday : "00/00/00") },
                            { label: 'Lugar de nacimiento', value: persona.place_of_birth ? persona.place_of_birth : "-" },
                            { label: 'Fecha de defunción', value: formatDate(persona.deathday ? persona.deathday : "00/00/00") },

                        ].map(({ label, value }, index) => (
                            <React.Fragment key={index}>
                                <Text fontSize="20px" mx={5} pt={index === 0 ? "1em" : "2em"} color="whiteAlpha.900">{label}</Text>
                                <Text fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.600">{value}</Text>
                            </React.Fragment>
                        ))}
                        <Text fontSize="20px" mx={5} pt="2em" color="whiteAlpha.900">También conocido como</Text>
                        {persona.also_known_as.length > 0 ? (
                            persona.also_known_as.map((alias, index) => (
                                <Text key={index} fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.600">{alias}</Text>
                            ))
                        ) : (
                            <Text fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">No hay información adicional sobre otros nombres conocidos.</Text>
                        )}
                    </Box>
                    <Box flex="3" p="2" >
                        {/* DESCRIPCION DE PERSONA */}
                        <Text fontSize="32px" mx={5} color="whiteAlpha.900" fontWeight="bold" >
                            {persona.name} 
                        </Text>
                        <Text fontSize="24px" mx={5} pt="1em" color="whiteAlpha.900">Biografía</Text>
                        <Text fontSize="lg" mx={5} pt="1em" color="whiteAlpha.800" lineHeight="1.5em" noOfLines={mostrarDescripcion ? undefined : 6} pr="4.5em" textAlign="justify">
                            {persona.biography ? persona.biography : "No tenemos información sobre la biografía de esta persona."}
                        </Text>

                        {persona.biography.length > 825 &&
                            <Button onClick={() => setMostrarDescripcion(!mostrarDescripcion)} bg="#CC3344" m="1em" color="whiteAlpha.900" _hover={{ bg: 'red.800' }} >
                                {mostrarDescripcion ? "LEER MENOS" : "LEER MÁS"}
                            </Button>
                        }
                        <Divider pt="2.5em" />

                        {/* PARTICIPACIONES */}
                        <Text fontSize="24px" mx={5} pt="1em" color="whiteAlpha.900">Participó en</Text>
                        <Box display="flex" color="white" w="calc(100vw - 30em)" overflow="scroll" overflowY="hidden">
                            {peliculasPersona.cast && peliculasPersona.cast.slice(0, 10).map((pelicula, index) => (
                                <Box key={index} m="1em" >
                                    {pelicula.media_type == "movie" ? (
                                        <Link to={`/pelicula/id/${pelicula.id}`} >
                                            <Tarjeta movie={pelicula} />
                                        </Link>
                                    ) : (
                                        <Link to={`/serie/id/${pelicula.id}`} >
                                            <Tarjeta movie={pelicula} />
                                        </Link>
                                    )}
                                </Box>
                            ))}
                        </Box>

                    </Box>
                </Flex>
            )
            }
        </>
    );
}
