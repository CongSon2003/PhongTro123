import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store , persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Audio } from 'react-loader-spinner'
import {BrowserRouter} from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('webpage'));
root.render(
    <Provider store={store}>
        <PersistGate loading = {null} persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
   
);
{/* <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
// </React.StrictMode> */}
