import React, {useState,useEffect} from 'react'
import {Container,Box,RadioGroup,Radio,HStack,VStack,Text, Image, StatLabel, StatNumber,Stat, StatHelpText, StatArrow, Badge, Progress,Button} from '@chakra-ui/react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { server } from '../main';
import axios from 'axios';
import Error from './Error';
import Chart from './Chart';

const CoinsDetails = () => {

  const [coin,setCoin] =useState([]);
  const [loading,setLoading] =useState(true);
  const [error,setError] =useState(false);
  const [currency,setCurrency] =useState("inr");
  const [days,setDays]=useState('24h');
  const [chartArray,setChartArray]= useState([])
  const currencySymbol=currency==='inr' ? "₹" : currency==="eur"? "€" :"$"
  const params=useParams();


  const btns=["24h","7d","14d","30d","60d","200d","365d"];
  const switchChartStats =(val)=>{
    switch(val){
      case '24h':
        setDays('24h');
        setLoading(true);
        break;

      case '7d':
        setDays('7d');
        setLoading(true);
        break;

      case '14d':
        setDays('14d');
        setLoading(true);
        break;

      case '30d':
        setDays('30d');
        setLoading(true);
        break;

      case '60d':
        setDays('60d');
        setLoading(true);
        break;

      case '200d':
        setDays('200d');
        setLoading(true);
        break;

      case '1y':
        setDays('1y');
        setLoading(true);
        break;

      // case 'max':
      //   setDays('max');
      //   setLoading(true);
      //   break;

      default:
        setDays('24h');
        setLoading(true);
        break;
    }
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`,{timeout:5000});
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days},{timeout:5000}`);
        // console.log(data);
        // console.log(chartData);
        setCoin(data);  // Assuming setCoins is defined in the component
        setChartArray(chartData.prices);
        setLoading(false);   // Assuming setLoading is defined in the component
        setError(false);
      } catch (error) {
        //console.log("Error fetching exchanges:", error);  // Log the error to the console
        setLoading(false);   // Set loading to false even if there's an error
        setError(true);
      }
    };

    fetchCoin();
  }, [params.id,currency,days]); 

  if(error) return (<Error message={"error while fetching Coins"}/>)

  return (
    <Container maxW={'container.xl'}>
      {
        loading?<Loader/> : (
          <>
          <Box width={'full'} borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          {/* Button*/}
          <HStack p='4' overflowX={'auto'}>
            {
              btns.map((i)=>(
                <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
              ))
            }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'inr'}>₹</Radio>
              <Radio value={'usd'}>$</Radio>
              <Radio value={'eur'}>€</Radio>
            </HStack>
        </RadioGroup>
          
          <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf={'center'} opactity={'0.7'}>
              Last Updated On {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>

            <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'}></Image>
          
          

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h>0 ? 'increase' : 'decrease'}/>
                  {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar high={`${coin.market_data.high_24h[currency]}`} low={`${coin.market_data.low_24h[currency]}`}/>

            <Box w={'full'} p={'4'}>
              <Item title={'Max Supply'} value={coin.market_data.max_supply} />
              <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply} />
              <Item title={'Market Cap'} value={`${currency} ${coin.market_data.market_cap[currency]}`}/>
              <Item title={'All Time Low'} value={`${currency} ${coin.market_data.atl[currency]}`}/>
              <Item title={'All Time High'} value={`${currency} ${coin.market_data.ath[currency]}`}/>
            </Box>
          </VStack>
          </>
        )
      }
    </Container>
  )
}


const CustomBar=({high,low})=>(
  <VStack>
    <Progress value={50} colorScheme={'teal'} w={'full'}/>
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)

const Item = ({title,value})=>(
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
)
export default CoinsDetails
