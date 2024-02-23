import React from 'react';
import { Flex, Text, Box, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Tarjeta from './Tarjeta';
const PalabrasClave = ({ keywords }) => {
    return (
        keywords.results.length > 0 && (
            <Flex flexDirection="column" pt="1em">
                <Text fontSize="20px" mx={5} color="whiteAlpha.900"> Palabras clave </Text>
                <Box display="flex" flexDirection="row" flexWrap="wrap" pl="1em">
                    {keywords.results.map((keyword) => (
                        <Link to={`/search/${keyword.name.split(" ")[0]}`} key={keyword.id}>
                            <Button m="0.3em" fontSize="14px" color="white" bg="#CC3344" _hover={{ bg: 'red.800' }} size="sm">
                                {keyword.name}
                            </Button>
                        </Link>
                    ))}
                </Box>
            </Flex>
        )
    );
};

const PeliculasRecomendadas = ({ recommended, isMovie, handleClick }) => {
    return (
        recommended.results.length > 0 && (
            <Flex flexDirection="column" pt="1em">
                <Text fontSize="20px" mx={5} color="whiteAlpha.900"> Recomendaciones </Text>
                <Box display="flex" flexDirection="row" flexWrap="wrap" pl="1em">
                    {recommended.results.slice(0, 8).map(item => (
                        <Link key={item.id} to={(isMovie === true ? (`/pelicula`) : (`/serie`)) + `/id/${item.id}`} style={{ textDecoration: 'none' }}>
                            <Button onClick={handleClick} m="0.3em" fontSize="14px" color="white" bg="#CC3344" _hover={{ bg: 'red.800' }} size="sm">
                                {item.title || item.name}
                            </Button>
                        </Link>
                    ))}
                </Box>
            </Flex>
        )
    );
};

const Reparto = ({ creditos }) => {
    return (
        <Flex mb="5em" flexDirection="column" h="20em" pl="1em">
            <Text fontSize="24px" mx={2} color="whiteAlpha.900" > Reparto </Text>
            <Flex justifyContent="flex-start" my="2em"  >
                <Box display="flex" color="white" overflowX="auto" overflowY="hidden">
                    {creditos.map((actor, index) => (
                        <Flex key={index} flexDirection="column" mx="1em">
                            <Link to={`/personas/id/${actor.id}`} style={{ borderRadius: "0.5em 0.5em 0 0", overflow: "hidden" }} >
                                {actor.profile_path && <Image src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} minW="11em" transition="0.4s" _hover={{ transform: "scale(1.1)" }} borderRadius="0.5em 0.5em 0 0" />}
                            </Link>
                            <Flex bg="#222222" justifyContent="center" alignItems="center" h="25%" mb="3em" flexDirection="column" borderRadius="0 0 0.5em 0.5em" pt="1em">
                                <Link to={`/personas/id/${actor.id}`}>
                                    <Text maxW="10em" textAlign="center">{actor.name}</Text>
                                </Link>
                                <Text maxW="10em" color="gray.300" textAlign="center">{actor.character}</Text>
                            </Flex>
                        </Flex>
                    ))}
                </Box>
            </Flex>
        </Flex>
    );
};

const PeliculasSimilares = ({ similar }) => {
    return (
        similar.results.length > 0 && (
            <Flex p="1em" mt="15em" flexDirection="column" pt="1em">
                <Text fontSize="24px" mx={2} color="whiteAlpha.900"> Series similares</Text>
                <Flex flexDirection="row" mt="2em" justifyContent="flex-start" >
                    <Box display="flex" color="white" overflow="auto" overflowY="hidden">
                        {similar.results.slice(0, 8).map((movie) => (
                            <Tarjeta item={movie} key={movie.id} conSlider />
                        ))}
                    </Box>
                </Flex>
            </Flex>
        )
    );
};

export { PalabrasClave, PeliculasRecomendadas, Reparto, PeliculasSimilares };
