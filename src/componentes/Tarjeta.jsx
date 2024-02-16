import React, { useState } from 'react';
import { Card, CardBody, Image, Stack, Heading, Box, Text, Skeleton } from "@chakra-ui/react"
// import nofoundimg from "../assets/nofoundimg.png"
import "../styles/stylesTarjeta.css"
const Tarjeta = ({ movie, conSlider }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Box
        position="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        overflow="hidden"
      >
        <Card
          borderRadius='lg'
          bg="transparent"
          w={conSlider ? "12em" : ""}
        >
          <CardBody
            p="2"
            borderRadius='lg'
            bg="black.800"
            display="flex"
            w="12em"
            flexDirection="column"
            justifyContent="space-between"
          >
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={`${movie.title}`}
                // fallbackSrc={nofoundimg}
                borderRadius='md'
                h="16.5em"
              />
            ) : (
              <Skeleton>
                <Box>Cargando</Box>
              </Skeleton>
            )}
          </CardBody>
        </Card>
        <Box
          position="absolute"
          bottom={isHovered ? "0" : "-100%"}
          left="0"
          right="0"
          h="80%"
          background="linear-gradient(to top, rgba(34, 34, 34, 1), rgba(34, 34, 34, 0.6) 60%, rgba(34, 34, 34, 0))"
          px="0.4em" pb="0.5em"
          borderRadius="sm"
          justifyContent="center"
          alignContent="center"
          transition="bottom 0.5s"
        >
          <Stack
            h="100%"
            color="white"
            justifyContent="end"
          >
            <Heading size='sm' noOfLines={1}>{`${movie.title || movie.name}`}</Heading>
            <Text
              noOfLines={5}
              fontSize="sm"
              fontWeight="200"
            >
              {movie.overview}
            </Text>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default Tarjeta;
