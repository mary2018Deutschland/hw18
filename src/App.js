import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Contacts from './pages/contacts';
import Basket from './pages/basket';
function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/basket" element={<Basket/>} />
      <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </>
  );
}

export default App;
