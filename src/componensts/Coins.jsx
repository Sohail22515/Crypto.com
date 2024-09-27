import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../main'
import { Container, HStack,Button,Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins,setCoins] =useState([]);
  const [loading,setLoading] =useState(true);
  const [error,setError] =useState(false);
  const [page,setPage]=useState(1);
  const [currency,setCurrency] =useState("inr");

  const currencySymbol=currency==='inr' ? "₹" : currency==="eur"? "€" :"$"

  const changePage=(page)=>{
    setPage(page);
    setLoading(true);
  }

  const btns=new Array(132).fill(1)

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`,{timeout:10000});
        //console.log(data);
        setCoins(data);  // Assuming setCoins is defined in the component
        setLoading(false);   // Assuming setLoading is defined in the component
        setError(false);
      } catch (error) {
        //console.log("Error fetching exchanges:", error);  // Log the error to the console
        setLoading(false);   // Set loading to false even if there's an error
        setError(true);
      }
    };
    
    fetchCoin();
  }, [currency,page]); 
  
  if(error) return (<Error message={"Api Limit exceed, wait for few second and try again"}/>)

  return (
    <Container maxw={'container.xl'}> 
      {loading ? (<Loader /> ):( <>

      <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
        <HStack spacing={'4'}>
          <Radio value={'inr'}>₹</Radio>
          <Radio value={'usd'}>$</Radio>
          <Radio value={'eur'}>€</Radio>
        </HStack>
      </RadioGroup>

      <HStack wrap={'wrap'} justifyContent={"space-evenly"}>
        {coins.map((i)=>(
          <CoinCard 
            id={i.id} 
            key={i.id} 
            name={i.name}
            price={i.current_price} 
            img={i.image} 
            symbol={i.symbol} 
            currencySymbol={currencySymbol} />
          // <div>{i.name}</div>
        ))}
      </HStack>

      <HStack w={'full'} overflow={'auto'} p={'8'} >
        {
          btns.map((item,index)=>(
            <Button
            key={index}
            bgColor={'blackAlpha.900'}
            color={'white'}
            onClick={()=> changePage(index+1)}
          >
              {index+1}
            </Button>
          ))
        }
      </HStack>
      </>
    )}

    </Container>
  )
}



export default Coins