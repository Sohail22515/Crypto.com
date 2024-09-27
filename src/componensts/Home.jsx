import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'
import src from "../assets/Bitcoin-4.jpg"
import {motion} from 'framer-motion'

const Home = () => {
  return (
    <Box
      bgColor={'blackAlpha.900'}
      w={'full'}
      h={'85vh'}
      position={'relative'}
    >
      <motion.div 
      style={{
        height:'80vh',

      }}
      animate={{ 
        translateY:'20px'
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:'reverse',
      }}
      >
        <Image
          src={src}
          w={'full'}
          h={'full'}
          objectFit={'cover'}  // Ensures the image covers the entire box
          objectPosition={'50% 25%;'}  
          zIndex={-1}
        />
      </motion.div>
      <Text
        fontSize={'6xl'}
        textAlign={'center'}
        fontWeight={'thin'}
        color={'whiteAlpha.700'}
        position={'absolute'}
        bottom={'10%'}  // Position the text a bit above the bottom
        left={'50%'}
        transform={'translateX(-50%)'}
      >
        Xcrypto
      </Text>
    </Box>
  )
}

export default Home
