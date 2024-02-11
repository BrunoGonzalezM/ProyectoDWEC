import React from 'react';
import "../styles/stylesCard.css"
import { Card, CardBody, Image, Stack, Heading, Box, Text } from "@chakra-ui/react"

const Tarjeta = ({ movie }) => {
  return (
    <>
      <Card size="sm" h="maxContent" borderRadius='lg' bg="transparent">
        <CardBody p="3" borderRadius='lg' bg="black.800" display="flex" flexDirection="column" justifyContent="space-between" >
          <Image
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title}`}
            borderRadius='md'
            minW='4.3em'  
            h="6.6em"
          />
          <Stack mt='6' spacing='3' color="white" h="5em" justifyContent="space-between">
            <Heading size='md' noOfLines={1}>{`${movie.title}`}</Heading>
            <Text
              noOfLines={6}
              fontSize=".4em"
              fontWeight="200"
            >
              {movie.overview}
            </Text>
            <Text color='blue.400' fontSize='.5em'>
              {movie.vote_average.toFixed(1)}/10
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default Tarjeta;