import { useEffect, useState } from 'react' 
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"; 
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import axios from "axios"

import './App.css' 

function App() { 


  const [userData, setuserData] = useState([]);

  const getData =async ()=>{
   try{
    const allData = await axios.get("https://jsonplaceholder.typicode.com/users");
     
     setuserData(allData.data);
     console.log(allData)

   }catch(err){
    alert(err.message);
   }
  }

  

  const setSearchTerm =(searchTerm)=>{
const filteredUsers = searchTerm.length>0? userData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  ):userData;
  setuserData(filteredUsers)
  console.log(filteredUsers)
  }

  useEffect(()=>{
   getData()
  },[])

  return (
  <div className=" vw-100 py-4 bg-dark vh-100  ">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg d-flex navbar-light bg-light mb-4 justify-content-between px-4">
        <a className="navbar-brand" href="#">MyApp</a>
        <form className="form-inline ml-auto">
          <input
            className="form-control"
            type="search"
            placeholder="Search Users"
            aria-label="Search"
            // value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </nav>

      {/* Main Content */}
      <div className="row">
        { userData && userData.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Phone:</strong> {user.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
        {userData.length === 0 && (
          <div className="col-12 text-center">
            <p>No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default App
