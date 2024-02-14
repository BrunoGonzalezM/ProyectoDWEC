import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { UnorderedList, ListItem, Flex, Box, Heading } from "@chakra-ui/react";
import Tarjeta from './Tarjeta';

const MovieCarousel = ({ title, movies, conSlider }) => {
    const ref = useRef(null);
    const [scroll, setScroll] = useState(0);

    const handleMoveLeft = () => {
        const newPosition = scroll <= 0 ? 0 : scroll - 220;
        ref.current.scrollTo({ left: newPosition, behavior: 'smooth' });
        setScroll(newPosition);
    };

    const handleMoveRight = () => {
        const newPosition = scroll >= 2600 ? 2600 : scroll + 220;
        console.log(newPosition)
        ref.current.scrollTo({ left: newPosition, behavior: 'smooth' });
        setScroll(newPosition);
    };

    return (
        <>
            {conSlider ? (
                <>
                    <Heading mx="0.6em" pt="1em">{title}</Heading>
                    <Flex className="MovieList" flexDirection="row" paddingInline="0em" alignItems="center">
                        {scroll > 0 && (
                            <Box
                                position="absolute"
                                left="0"
                                h="fitContent"
                                bg="#222222"
                                opacity="60%"
                                _hover={{ transform: "scale(1.2)", color: "white", bg: "#CC3344", opacity: "100%" }}
                                transition=".4s"
                                color="#a7a7a7"
                                ml="2em" p="1em"
                                borderRadius="full"
                                zIndex="2"
                            >
                                <IoIosArrowBack className='left' onClick={handleMoveLeft} size={40} />
                            </Box>
                        )}
                        <UnorderedList
                            display="flex"
                            listStyleType="none"
                            overflow="hidden"
                            padding="1em 0"
                            margin="0 auto"
                            flex="0 0 calc(100vw - 4em)"
                            width="calc(100vw - 4em)"
                            paddingInline="1em" ref={ref}
                            maxW="113em"
                        >
                            {movies.map((movie) => (
                                <ListItem
                                    backgroundColor="#00000030"
                                    margin="0 1em 0 0"
                                    cursor="pointer"
                                    transition="1s"
                                    borderRadius="5px"
                                    key={movie.id}
                                    _hover={{ transform: "scale(1.08)", }}
                                >
                                    <Link to={`/pelicula/id/${movie.id}`}>
                                        <Tarjeta movie={movie} conSlider={true} />
                                    </Link>
                                </ListItem>
                            ))}
                        </UnorderedList>
                        {scroll < 2599 && (
                            <Box
                                position="absolute"
                                right="0"
                                h="fitContent"
                                bg="#222222"
                                opacity="60%"
                                _hover={{ transform: "scale(1.2)", color: "white", bg: "#CC3344", opacity: "100%" }}
                                transition=".4s"
                                color="#a7a7a7"
                                mx="1em" p="1em"
                                borderRadius="full"
                            >
                                <IoIosArrowForward className='right' onClick={handleMoveRight} size={40} />
                            </Box>
                        )}
                    </Flex>
                </>
            ) : (
                <>
                    <Flex
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        flexWrap="wrap"
                        backgroundColor="#00000030"
                        w="100%"
                        margin="0 auto"
                    >
                        {movies.map((movie) => (
                            <UnorderedList
                                key={movie.id}
                                display="flex"
                                listStyleType="none"
                                overflow="hidden"
                                padding="40px 0"
                                flex="0 0 20em"
                                justifyContent="center"
                                alignContent="center"
                                maxWidth="calc(100vw - 9em)"
                                paddingInline="1em"
                                ref={ref}
                            >
                                <Link to={`/pelicula/id/${movie.id}`}  >
                                    <Tarjeta movie={movie} />
                                </Link>
                            </UnorderedList>
                        ))}
                    </Flex>
                </>
            )}
        </>
    );
};

export default MovieCarousel;