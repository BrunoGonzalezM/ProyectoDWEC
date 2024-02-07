import { Link } from "react-router-dom";
import "../styles/stylesBanner.css";
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react';

export default function Banner({ movies }) {
    return (
        <>
            {movies.slice(0, 1).map((movie) => {
                if (movie) {
                    return (
                        <Card
                            key={movie.id}
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : ""}
                                alt={`${movie.title}`}
                            />

                            <Stack>
                                <CardBody>
                                    <Heading size='md'>{movie.title}</Heading>
                                    <Text py='2' w= 'full' fontSize='sm' color='gray.500'  textAlign='left'>
                                        Rating: {movie.vote_average}/10 | Released on {new Date(movie.release_date).getFullYear()}
                                        <br />
                                        {movie.overview ? movie.overview : ""}
                                    </Text>
                                </CardBody>

                                <CardFooter>
                                    <Link to={`/pelicula/id/${movie.id}`} >
                                        <Button colorScheme="red" >
                                            VER TRAILER
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Stack>
                        </Card>
                    );
                }
                return null;
            })}
        </>
    );
}
