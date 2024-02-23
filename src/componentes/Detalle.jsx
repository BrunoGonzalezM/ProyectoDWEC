import React from 'react';
import { Text, Image } from '@chakra-ui/react';

const Detalle = ({ titulo, valor, tipo = "texto", watchProviders }) => {
    const renderValor = () => {
        if (tipo === "imagen") {
            return (
                watchProviders && watchProviders.US && watchProviders.US.buy ? (
                    <Image borderRadius="100%" ml="1em" src={`https://image.tmdb.org/t/p/w45/${watchProviders.US.buy[0].logo_path}`} />
                ) : (
                    <Text fontSize="18px" mx={5} color="whiteAlpha.800">No hay información del proveedor</Text>
                )
            );
        } else {
            return <Text fontSize="18px" mx={5} color="whiteAlpha.800">{valor || "-"}</Text>;
        }
    };

    return (
        <>
            <Text fontSize="20px" mx={5} pt="1em" color="whiteAlpha.900">{titulo}</Text>
            {renderValor()}
        </>
    );
};

export default Detalle;
