import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Box } from '@chakra-ui/react';

function Peliculas() {
    const { busqueda } = useParams();
    return (
        <Flex>
            <Box>
                Resultados de búsqueda para: {busqueda}
            </Box>
        </Flex>
    );
}

export default Peliculas;
