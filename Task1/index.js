import React from "react";
import { createRoot } from 'react-dom/client';


function App(){

const [data, setData] = React.useState("HEllo");
return (
  <h1>Hello</h1>
)

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);