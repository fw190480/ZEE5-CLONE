
import { Box, Button, Flex, Img, Input, InputGroup, InputLeftElement, Spacer, Text } from "@chakra-ui/react"

import { BsGrid3X3GapFill, BsSearch } from "react-icons/bs"
import { GiHamburgerMenu } from "react-icons/gi"
import { FaCrown } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import "./NavbarV.css"
import { Link } from "react-router-dom"
import DropDown from "../Component-MK/DropDown";
import Grid from "../Component-MK/grid";
import Search from "../Component-MK/Search"
import { useState } from "react"
import { useSelector } from "react-redux"
import LOGO from "../Images/vidfyIcon.png"
import UserProfile from "../Components-Rk/UserProfile"
import SearchF from "../Components-Rk/SearchD"


function Navbar() {
  const [click, setClick] = useState(false);
  const [hover, setHover] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [close, setClose] = useState(true);
  const state = useSelector(state => state);

  const { auth } = useSelector(store => store.auth)


  return (
    <Box pr="1rem" position={"fixed"} zIndex={2} w="full" top="0" >

      <Flex className="NavbarMainV" >
        {/* nav first half */}
        <Box pl="2rem" >

          <Flex className="NavbarFirstPartV"  >
            <Link to="/"><Img className="NavbarFirstPartV-Icon" src={LOGO} /></Link>

            <Link to="/"> <Box className="NavbarFirstPartV-Home">Home</Box></Link>
            <Link to="/tvShows"><Box className="NavbarFirstPartV-Tv">Tv Shows </Box></Link>
            <Link to="/movies"><Box className="NavbarFirstPartV-Movies"> Movies</Box></Link>
            <Box className="NavbarFirstPartV-Option"><BsGrid3X3GapFill onClick={() => setHover(!hover)}
              size={"20"} /></Box>
          </Flex>
        </Box>
        {/* nav second half */}

        <Box>
          <Flex className="NavbarSecondPartV">
            <Box className="NavbarSecondpartV-Search">
            {/* search box componet imported from SearchD */}
              <SearchF />

            </Box>
            <Box className="NavbarSecondPartV-Lan" ><Flex><Text>A</Text><Text className="NavbarSecondPartV-LanHindi">अ</Text></Flex>

            </Box>
            {

              auth ? <Flex alignItems="center" className="NavbarSecondPartV-Menu" ><UserProfile /></Flex> :
                <Link to="/login"><Box className="NavbarSecondPartV-Login"> <Button colorScheme={"black"} bg={"black"} border={"1px solid white"}>LOGIN</Button></Box></Link>
            }
            <Link to="/myaccount/subscription"><Box className="NavbarSecondPartV-Buy"> <Button bg={"darkorchid"} border={"1px solid darkorchid"}><FaCrown className="Crown" /><Text>BUY PLAN</Text></Button></Box></Link>
            <Flex alignItems="center" className="NavbarSecondPartV-Menu" ><GiHamburgerMenu size={"20"} /></Flex>

          </Flex>
        </Box>
      </Flex>


    </Box>


  )
}
export default Navbar