import React from 'react';
import { Avatar, Box, Stack, VStack, Text, Link, HStack } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import profile from '../assets/avatar.jpg';
const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} color={'whiteAlpha.700'} minH={'28'} px={'16'} py={['8', '4']}>
      <Stack direction={['column', 'row']} h={'full'} alignItems={'center'}>
        <VStack w={'full'} alignItems={['center', 'flex-start']}>
          <Text fontWeight={'bold'} color={'white'}>About</Text>
          <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center', 'left']} color={'white'}>
            @All rights reserved :Sohail
          </Text>
        </VStack>
        <VStack>
          <Avatar boxSize={'16'} mt={['4', '0']} src={profile}/>
          <Text color={'white'}>Sohail</Text>
        </VStack>
        <HStack spacing={4} mt={['4', '0']} justifyContent={['center', 'flex-start']}>
          <Link href="https://github.com/Sohail22515" isExternal>
            <Box boxSize={['6', '10']}>
              <FaGithub color="white" size="100%" />
              {/* <Text color={'white'} alignContent={'auto'}>GitHub</Text> */}
            </Box>
            
          </Link>
          <Link href="https://www.linkedin.com/in/mohammad-sohail22515/" isExternal>
          <Box boxSize={['6', '10']}>
              <FaLinkedin color="white" size="100%" />
              {/* <Text color={'white'} alignContent={'auto'}>GitHub</Text> */}
            </Box>
          </Link>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
