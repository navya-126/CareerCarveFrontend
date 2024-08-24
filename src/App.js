import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import SlotBooking from './components/SlotBooking';

import './App.css';

const App=()=>(
  <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/slot-booking" element={<SlotBooking />} />
  </Routes>
  </BrowserRouter>
)

export default App;
