import React from 'react'
import {VStack, Heading,Image,Text } from '@chakra-ui/react';
import {Link} from 'react-router-dom'

const CoinCard =({id,name,img,price,currencySymbol="₹"})=>(
   
    <Link to={`/coins/${id}`} target={'_blank'}>  {/* if Link was improted from react-router-dom the to would replace here */}
      <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'}
        m={'4'}
        css={{
          "&:hover":{
            transform:"scale(1.1)"
          }
        }}
        >
        <Image 
          src={img}
          w={'10'}
          h={'10'}
          objectFit={'contain'}
          alt={'Coin'}
        />
        <Heading size={'md'} noOfLines={1}>{name}</Heading>
        <Text noOfLines={1}>{price ? `${currencySymbol}${price}` :"NA"}</Text>
      </VStack>
  
    </Link>
  )
      
  


export default CoinCard