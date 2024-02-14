import React, { useState } from 'react';
import { Card, CardBody, Image, Stack, Heading, Box, Text, SkeletonCircle, SkeletonText } from "@chakra-ui/react"

const Tarjeta = ({ movie, conSlider }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Box
        position="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          size="sm"
          borderRadius='lg'
          bg="transparent"
          {...(conSlider ? { w: "11em" } : {})}
        >
          <CardBody
            p="3"
            borderRadius='lg'
            bg="black.800"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={`${movie.title}`}
                borderRadius='md'
                minW='4.3em'
                minH="6.6em"
              />
            ) : (
              <>
                <Box h="maxContent" w="16em" >
                  <Box padding='6' h="24em" boxShadow='lg' bg="#22222299" borderRadius="md">
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={6} spacing='4' skeletonHeight='2' />
                  </Box>
                </Box>
              </>
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
            <Heading size='sm' noOfLines={1}>{`${movie.title}`}</Heading>
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
