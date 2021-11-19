import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('TOKEN');
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

