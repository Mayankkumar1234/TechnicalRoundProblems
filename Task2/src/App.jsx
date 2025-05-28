import { useEffect, useRef, useState } from 'react' 
import Container from 'react-bootstrap/Container'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"; 
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import axios from "axios"
import { motion } from "framer-motion";


function App() { 
  
   const ref = useRef(null);

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
   
const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setuserData(filteredUsers)
  }

  useEffect(()=>{
   getData()
  },[])

  return (
  <div style={{width:"100vw", overflowX:"hidden"}} className=" w-screen  bg-dark vh-100   ">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg d-flex navbar-light bg-light mt-0 mb-4 justify-content-between px-4 py-3">
        <a className="cursor-pointer navbar-brand" href='#' onClick={(e)=>{
          e.preventDefault();
          getData()
        }}>MyApp</a>
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
      <div className="row px-3 pt-4 d-flex   gap-2 align-items-center justify-content-center" ref={ref}>
        { userData && userData.map((user) => (
          <motion.div 
drag dragConstraints={ref} className=" col-12 col-sm-4 col-md-4 col-lg-3 mb-4   "   key={user.id}>
            <div className="card rounded-5  ">
              <div className=" card-body d-flex flex-column gap-2 align-items-center">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text d-flex flex-column gap-1">
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Phone:</strong> {user.phone}
                </p>
              </div>
              
            </div>
          </motion.div>
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
