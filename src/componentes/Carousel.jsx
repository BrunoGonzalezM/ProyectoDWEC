import React, { useRef, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { UnorderedList, ListItem, Flex, Box, Heading } from "@chakra-ui/react";
import Tarjeta from './Tarjeta';

const Carousel = ({ title, items, conSlider }) => {
    const ref = useRef(null);
    const [scroll, setScroll] = useState(0);

    //FLECHA CARRUSEL IZQUIERDA
    const handleMoveLeft = () => {
        const newPosition = scroll <= 0 ? 0 : scroll - 280;
        ref.current.scrollTo({ left: newPosition, behavior: 'smooth' });
        setScroll(newPosition);
    };
    //FLECHA CARRUSEL DERECHA
    const handleMoveRight = () => {
        const newPosition = scroll >= 3750 ? 3750 : scroll + 280;
        ref.current.scrollTo({ left: newPosition, behavior: 'smooth' });
        setScroll(newPosition);
    };

    return (
        <>
            {conSlider ? (
                <>
                    <Heading m="0 auto" w="85vw" pt="1em">{title}</Heading>
                    <Flex className="MovieList" flexDirection="row" paddingInline="0em" alignItems="center" >
                        <Box
                            position="relative" left="0" h="fitContent" bg="#222222" opacity={scroll > 0 ? "0.6" : "0"}
                            _hover={{ transform: "scale(1.2)", color: "white", bg: "#CC3344", opacity: "100%" }}
                            transition=".4s" color="#a7a7a7"  p="1em" borderRadius="full" zIndex="2"  mr="-5em"
                        >
                            <IoIosArrowBack className='left' onClick={handleMoveLeft} size={40} />
                        </Box>

                        <Flex justifyContent="center" alignContent="center" w="100%" m="0 auto">
                            <UnorderedList
                                display="flex" listStyleType="none" overflow="hidden" padding="1em 0"
                                margin="auto" ref={ref} maxW="75em" 
                            >
                                {items.map((item, index) => (
                                    <Box key={index} >
                                        {item.poster_path &&
                                            <ListItem
                                                backgroundColor="#00000030" {...(index == 0 ? { m: "0 2em 0 0" } : { mx: "2em" })}
                                                cursor="pointer" transition="1s" borderRadius="5px" w="12em"
                                                _hover={{ transform: "scale(1.08)", }}
                                            >
                                                <Tarjeta item={item} conSlider={true} />
                                            </ListItem>
                                        }
                                    </Box>
                                ))}
                            </UnorderedList>
                        </Flex>
                        <Box position="absolute" right="0" h="fitContent" bg="#222222" opacity={scroll < 3639 ? "0.6" : "0"}
                            _hover={{ transform: "scale(1.2)", color: "white", bg: "#CC3344", opacity: "100%" }}
                            transition=".4s" color="#a7a7a7" mx="1em" p="1em" borderRadius="full"
                        >
                            <IoIosArrowForward className='right' onClick={handleMoveRight} size={40} />
                        </Box>
                    </Flex>
                </>
            ) : (
                <>
                    <Flex
                        flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap"
                        backgroundColor="#00000030" w="100%" margin="0 auto"
                    >
                        {items.map((item) => (
                            <Box key={item.id}>
                                {item.poster_path && (
                                    <UnorderedList
                                        display="flex" listStyleType="none" overflow="hidden"
                                        justifyContent="center" alignContent="center"
                                        maxWidth="calc(100vw - 9em)" p="1em" ref={ref}
                                    >
                                        <Tarjeta item={item} />
                                    </UnorderedList>
                                )}
                            </Box>
                        ))}
                    </Flex>
                </>
            )}
        </>
    );
};

export default Carousel;
