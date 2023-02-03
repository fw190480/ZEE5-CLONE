import { Box, Button, Checkbox, Flex, Heading, Input, Spacer, Spinner, Stack, Text, useToast } from "@chakra-ui/react"
import { Link, Navigate,useNavigate } from "react-router-dom"

import { AiFillApple, AiFillFacebook, AiOutlineTwitter } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import "./SignupV.css"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { authSignUpSucess, resetInfo } from "../../Redux/auth/auth.action"

const init = {
    name: "", email: "", password: ""
}

function Signup() {
    const [user, setUser] = useState(init)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const toast = useToast()
    const { signup, loading, error,status } = useSelector(state => state.auth);

    useEffect(() => {
        if (status==500) {
            toast({
                title: 'Sorry.',
                description: "Something Went Wrong Please Try Again.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        if (status==401) {
            toast({
                title: 'Sorry.',
                description: "Your Email is Exist Already, Go for login.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        if(status==201){
            toast({
                title: 'Sucess.',
                description: "SignUp Successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            dispatch(resetInfo())

            navigate('/login')
            
        }
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authSignUpSucess({ ...user }))
        // console.log({...user})
    }
    // if (signup) {
    //     return <Navigate to="/login" />
    // };
    // console.log(user)
    return (
        <Box >
            <Stack>
                <Box className="LoginMainBox" >
                    <Box className="LoginInnerBox"><Heading fontSize={"larger"} marginBottom={"20px"}>Create a new account</Heading>
                        <Box border="1px solid #0f0617" >
                            <Text marginBottom={"20px"} fontSize={"xlg"} textalign={"justify"} fontWeight={"light"}>Create an account to continue enjoying uninterrupted video and personalised experience</Text>
                        </Box>
                        <Box marginBottom={"20px"} marginTop={"30px"} className="LoginIcons">
                            <Flex justifyContent={"center"} backgroundColor={"white"} padding={"6px"} borderRadius={"5px"}>
                                <Box backgroundColor={"white"} color="black" borderRadius={"50%"} padding={"5px"}><FcGoogle size="25px" /></Box><Box color="red" paddingTop={"5px"} fontWeight={"bold"}>Sign in</Box>
                            </Flex></Box>
                        <Box w={"40px"} marginLeft={"45%"} backgroundColor={""} color="white" borderRadius={"50%"} padding={"4px"}>or</Box>
                        <Stack >
                            <form onSubmit={handleSubmit} >
                                <Box borderBottom={"1px solid gray"}><Input onChange={handleChange} type={"text"} border={"none"} marginTop={"30px"} value={user.name} name="name" placeholder="Enter Your Name" /></Box>
                                <Box borderBottom={"1px solid gray"}><Input onChange={handleChange} type="text" border={"none"} value={user.email} marginTop={"30px"} name="email" placeholder="Enter email id" /></Box>
                                <Box borderBottom={"1px solid gray"} marginBottom={"15px"}><Input onChange={handleChange} value={user.password} type="password" border={"none"} name="password" marginTop={"30px"} placeholder="Create password" /></Box>

                                <br />
                                <Button position={"relative"} colorScheme={"telegram"} w={"100%"} bg={"none"} border={"1px solid gray"} type="submit" marginBottom={"10px"} marginTop={"10px"} paddingBottom={"15px"} paddingTop={"15px"}>
                                    <Text opacity={loading?".2":"1"} as={'span'}>Register</Text>
                                    {loading && <Spinner position={"absolute"} />}
                                </Button>
                                <Box>
                                    <Checkbox marginTop={"5px"}></Checkbox > By proceeding you agree to our Terms of Service & Privicy Policy.</Box>
                            </form>
                        </Stack>
                        <Box marginTop={"30px"}>Already registered?  <Link to="/login" >Login</Link></Box>
                    </Box>
                </Box>
            </Stack>
        </Box>
    )

}
export default Signup