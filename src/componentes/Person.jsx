import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPersonId } from '../funciones/fetch';
import { Box, Image, Flex, Text, Button } from "@chakra-ui/react";

const imgURL = `https://image.tmdb.org/t/p/w500/`;

const departmentTranslations = {
    "Acting": "Actuación"
};

const genderTranslations = {
    2: "Masculino",
    1: "Femenino"
};

export default function Personas() {
    const { id } = useParams();
    const [persona, setPersona] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllBiography, setShowAllBiography] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const personaData = await fetchPersonId(id);
                setPersona(personaData);
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
                            {departmentTranslations[persona.known_for_department] || persona.known_for_department}
                        </Text>
                        <Text fontSize="20px" mx={5} pt="1em" color="whiteAlpha.900">
                            Sexo
                        </Text>
                        <Text fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">
                            {genderTranslations[persona.gender] || persona.gender}
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
                            {persona.place_of_birth}
                        </Text>
                        <Text fontSize="20px" mx={5} pt="1em" color="whiteAlpha.900">
                            También conocido como
                        </Text>
                        {persona.also_known_as.map((alias, index) => (
                            <Text key={index} fontSize="18px" mx={5} pt="0.1em" color="whiteAlpha.800">
                                {alias}
                            </Text>
                        ))}
                    </Box>
                    <Box flex="3" p="2">
                        <Text fontSize="32px" mx={5} color="whiteAlpha.900" fontWeight="bold">
                            {persona.name}
                        </Text>
                        <Text fontSize="24px" mx={5} pt="1em" color="whiteAlpha.900">
                            Biografía
                        </Text>
                        <Text fontSize="lg" mx={5} pt="1em" color="whiteAlpha.800" noOfLines={showAllBiography ? undefined : 12}>
                            {persona.translations && persona.translations.find(translation => translation.iso_639_1 === "es") ? persona.translations.find(translation => translation.iso_639_1 === "es").data.biography : persona.biography ? persona.biography : "Biografía no disponible"}
                        </Text>
                        {showAllBiography ? (
                            <Button onClick={() => setShowAllBiography(false)} bg="#CC3344" mt="1em" color="whiteAlpha.900">
                                LEER MENOS
                            </Button>
                        ) : (
                            <Button onClick={() => setShowAllBiography(true)} bg="#CC3344" mt="1em" color="whiteAlpha.900">
                                LEER MÁS
                            </Button>
                        )}
                    </Box>
                </Flex>
            )}
        </>
    );
}
