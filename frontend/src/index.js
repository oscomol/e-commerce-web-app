import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { Store } from './components/api/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
  </ChakraProvider>
);
