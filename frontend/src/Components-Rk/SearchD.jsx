import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Box, Input, Button, Text, Grid, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom"
// const url = `http://www.omdbapi.com/?apikey=e2045007&s=${query}`
function SearchF() {
    const [query, setQuery] = useState('');
    const [searchData, setSearchData] = useState([]);
    let searchRef = useRef()
    useEffect(() => {
        // console.log(query)
        searchRef.current = setTimeout(() => {
            if (query.length !== 0) {
                axios.get(`http://www.omdbapi.com/?apikey=e2045007&s=${query}`).then(res => {
                    setSearchData([...res.data.Search])
                    // console.log(res.data)
                })
            }
        }, 300);
        if (!query) {
            setSearchData([])
        }
        return () => {
            clearTimeout(searchRef.current)
        }
    }, [query])

    const clearSearchData = () => {
        setSearchData([])
        setQuery('')
    }



    console.log(searchData)
    return (
        <Box position={"relative"}>
            <Input type={"search"} value={query} onChange={({ target }) => setQuery(target.value)} placeholder='Search for Movies,Shows,Channels etc.' />
            {/* <Button onClick={clearData} >Clear</Button> */}
            <Grid
                pos="absolute"
                maxH="60vh"
                overflowY="scroll"
                gap="5px"
                fontFamily={"monospace"}
                bg="gray.300"
                w="full"
                onClick={clearSearchData}
            >
                {searchData.map((item, ind) =>
                    <Link to={`/video/play/${item.Title}`}>
                        <Flex m="5px 1rem" borderRadius={"md"} boxShadow="md" p=".4rem" pl="1rem" gap="1rem" alignItems={"center"} justifyContent="flex-start" _hover={{ bg: "gray.100", cursor: "pointer" }}>
                            <Image boxSize={"2.5rem"} borderRadius="full" src={item.Poster} alt={item.Title} />
                            <Text textAlign={"left"} key={ind} color="black" w="full">{item.Title}</Text>
                        </Flex>
                    </Link>

                )}
            </Grid>

        </Box>
    );
}

export default SearchF;
