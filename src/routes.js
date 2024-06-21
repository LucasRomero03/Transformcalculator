import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TransformerForm from './components/TransformerForm';
import Result from './components/Result';
import Erro from './pages/Erro';
import App from './components/App';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/<Transformcalculator>' element={ <Home/>} />
                <Route path='/<Transformcalculator>' element={ <TransformerForm/>} />
                <Route path='/<Transformcalculator>' element={ <Result/>} />
                <Route path='/<Transformcalculator>' element={ <App/>} />
                <Route path='*' element= { <Erro/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;