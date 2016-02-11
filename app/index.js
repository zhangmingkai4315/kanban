import './main.css';
import React from "react";
import ReactDOM from "react-dom";
import App from './components/App.jsx';
import alt from "./lib/alt";
import storage from "./lib/storage";
import persist from "./lib/persist"

persist(alt,storage,'kanban');
console.log('Version0.0.1');
ReactDOM.render(<App />,document.getElementById('app'));
