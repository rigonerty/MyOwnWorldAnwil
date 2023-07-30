import { useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter} from 'react-router-dom';
import { Navbar } from './components/UI/Navbar/Navbar';
import { Footer } from './components/UI/Footer/Footer';
import { appUseDispatch } from './hooks/reduxHooks';
import { checkAuth } from './store/user';
import { AppRouter } from './components/AppRouter';
function App() {
  const dispatch = appUseDispatch()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      dispatch(checkAuth())      
    }

  },[])
  return (
  <BrowserRouter>
    <Navbar/>
    <div className='App'>
      <AppRouter/>    
    </div>

    <Footer/>
  </BrowserRouter>
  );
}

export default App;
