import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../main'
import { Container, HStack, VStack, Heading,Image,Text } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';


const Exchanges = () => {
  const [exchanges,setExchanges] =useState([]);
  const [loading,setLoading] =useState(true);
  const [error,setError] =useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`,{timeout:10000});
        //console.log(data);
        setExchanges(data);  // Assuming setExchanges is defined in the component
        setLoading(false);   // Assuming setLoading is defined in the component
        setError(false);
      } catch (error) {
        //console.log("Error fetching exchanges:", error);  // Log the error to the console
        setLoading(false);   // Set loading to false even if there's an error
        setError(true);
      }
    };
    
    fetchExchanges();
  }, []);
  
  if(error) return (<Error message={"Api Limit exceed, wait for few second and try again"}/>)

  return (
    <Container maxw={'container.xl'}> 
      {loading ? (<Loader /> ):( <>
      <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
        {exchanges.map((i)=>(
          <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
          // <div>{i.name}</div>
        ))}
      </HStack>
      </>
    )}

    </Container>
  )
}


const ExchangeCard =({ name ,img,rank,url})=>(
  <a href={url} target={'blank'}>
    <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'}
      m={'4'}
      css={{
        "&:hover":{
          transform:"scale(1.1)"
        }
      }}>
      <Image 
        src={img}
        w={'10'}
        h={'10'}
        objectFit={'contain'}
        alt={'Exchnage'}
      />
      <Heading size={'md'} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>

  </a>
)

export default Exchanges;
