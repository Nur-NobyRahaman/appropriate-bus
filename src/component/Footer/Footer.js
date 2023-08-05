import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import React from 'react';
import fb from '../../image/fackbook.png'
import insta from '../../image/insta.png'
import discode from '../../image/discode.png'
import linked from '../../image/linkedin.png'
import twitter from '../../image/twiter.png'


const Footer = ({status}) => {
    return (
        <Box mt={5} bgcolor={'black'}  sx={{height:{xl:"42vh",lg:'38vh',md:'53vh',},display:{xs:'none',sm:'none',md:"block"}}}>
            <Box width={'77vw'} mx={'auto'} display={'flex'} pt={4} justifyContent={'space-around'} alignItems={'start'}>
                <Box sx={{width:{xl:'20vw',lg:'25vw',md:'25vw'}}}  display={'flex'} flexDirection={'column'} justifyContent={'start'}>
                    <Box>
                        <Typography textAlign={'center'} color={'white'} textTransform={'uppercase'}>Get More information</Typography>
                    </Box>
                    <Box>
                        <form action="https://formspree.io/f/mdorolqg" method="post"  >
                            <Box display={'flex'} flexDirection={'column'}>

                                <TextField
                                    sx={{ bgcolor: 'white' }}
                                    type="email"
                                    name="email"
                                    color="success"
                                    size="small"
                                    required
                                    variant='filled'
                                    label="Enter Email"
                                    margin="normal"
                                ></TextField>
                                <TextField
                                    sx={{ bgcolor: 'white', mb: 1 }}
                                    multiline
                                    rows={2}
                                    color="success"
                                    size="small"
                                    variant='filled'
                                    required
                                    label="Write Message"
                                    name="message"

                                ></TextField>
                                <Button sx={{ bgcolor: status && "#212121", color: status && "white", "&:hover": status && { bgcolor: 'gray' } }} target="_blank" type="submit" variant="contained" color="success" size='small'>Submit</Button>

                            </Box>
                        </form>
                    </Box>
                </Box>
                <Box   sx={{width:{xl:'35.5vw',lg:'35vw',md:"25vw"}}} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Box>
                        <Box>
                            <Typography textAlign={'center'} color={'white'} textTransform={'uppercase'}>Follow us</Typography>
                        </Box>
                        <Box display={'flex'}  justifyContent={'center'} gap={2} mt={2}>
                            <Box sx={{width:{xl:'3%',lg:"6%",md:"10%"} , height:{xl:'4%',lg:'8.5%',md:'15%'}}}>
                                <a href="https://www.facebook.com/nurnoby.rahaman/" target='_blank'>
                                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={fb} alt="f" />
                                </a>
                            </Box>
                            <Box sx={{width:{xl:'3%',lg:"6%",md:"10%"} , height:{xl:'4%',lg:'8.5%',md:'15%'}}}>
                                <a href="https://www.instagram.com/nurnoby2588/" target='_blank'>
                                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={insta} alt="f" />
                                </a>
                            </Box>
                            <Box sx={{width:{xl:'3%',lg:"6%",md:"10%"} , height:{xl:'4%',lg:'8.5%',md:'15%'}}}>
                                <a href="https://www.linkedin.com/in/nur-noby-40293b182" target='_blank'>
                                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={linked} alt="f" />
                                </a>
                            </Box>
                            <Box  sx={{width:{xl:'3%',lg:"6%",md:"10%"} , height:{xl:'4%',lg:'8.5%',md:'15%'}}}>
                                <a href="https://twitter.com/NurnobyRahaman" target='_blank'>
                                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={twitter} alt="f" />
                                </a>
                            </Box>



                        </Box>
                    </Box>
                </Box>
                <Box  sx={{width:{xl:'20vw',lg:'10vw',md:'20vw'}}} display={'flex'}  justifyContent={'center'}>
                    <Box>
                        <Box>
                            <Typography textAlign={'center'} color={'white'} textTransform={'uppercase'}>Call us</Typography>
                        </Box>
                        <Box mt={1.5}>
                            <Typography textAlign={'center'} color={'white'}>01710258850</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ bgcolor: 'white', mt: 2, mb: 2 }}></Divider>
            <Box>

                <Typography textAlign={'center'} color={'white'}>@ copyRight {new Date().getFullYear()}</Typography>
            </Box>

        </Box>
    );
};

export default Footer;