import React from "react";

const { search} = useParams();

function Peliculas({search}) {
    return (
        <>
            {search ? (
                <Flex>
                    {search.map((movie) => {
                        <Box key={movie.id}>
                            {movie.title}
                        </Box>
                    })}
                </Flex>
            ) : ("")}
        </>
    )
}