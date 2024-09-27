import {BrowserRouter as Rotuter,Routes,Route} from 'react-router-dom'
import './App.css'
import Header from "./componensts/Header";
import Home from "./componensts/Home";
import Coins from "./componensts/Coins";
import CoinsDetails from "./componensts/CoinsDetails"
import Exchangers from "./componensts/Exchanges"
import Footer from './componensts/Footer';



function App() {

  return (
    <Rotuter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/coins" element={<Coins />}/>
        <Route path="/exchanger" element={<Exchangers />}/>
        <Route path="/coins/:id" element={<CoinsDetails/>}/> {/* Dynamic route for coin details */}
      </Routes>
      <Footer/>
    </Rotuter>
  )
}

export default App
