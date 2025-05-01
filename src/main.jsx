
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log("Main file executing");

const root = createRoot(document.getElementById("root"))
root.render(<App />);
