import { useEffect, useRef, useState } from 'react' 
import axios from "axios"
import { motion } from "framer-motion";


function App() { 
  
   const ref = useRef(null);

  const [userData, setuserData] = useState([]);
  const [currentPage , setCurrentPage] = useState(1);
 const usersPerPage = 5;

  const getData =async ()=>{

    //  Using try and catch block to fetch the data 
   try{
    const allData = await axios.get("https://jsonplaceholder.typicode.com/users");
     
     setuserData(allData.data);
     console.log(allData)

   }catch(err){
    alert(err.message);
   }
  }
   
   // This code is for the pagination on the existing data

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;

  // In this line data is slice based on the number of page
  const currentUsers = userData.slice(indexOfFirst, indexOfLast);

  const setSearchTerm =(searchTerm)=>{
   // This code is for filter the user based on thier name
const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setuserData(filteredUsers)
  }
 
  // useEffect for render the data  whenever the page loads

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
        { currentUsers && currentUsers.map((user) => (
          <motion.div 
          // This is the addition drag feature
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

    {/* when there is no user it will print this */}
        {userData.length === 0 && (
          <div className="col-12 text-center">
            <h2 className='position-fixed top-5 start-5 text-white'>No users found.</h2>
          </div>
        )}
      </div>

      {/*This is the pagination section */}
      <div className="d-flex justify-content-end mt-4 position-fixed bottom-0 end-0 px-5">
  <ul className="pagination gap-2">
    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(prev =>prev-1)}>
        &lt;
      </button>
    </li>
    
    {[1, 2].map((ele) => (
      <li key={ele} className={`page-item ${currentPage === ele ? 'active' : ''}`}>
        <button className="page-link" onClick={() => setCurrentPage(ele)}>
          {ele}
        </button>
      </li>
    ))}

    <li className={`page-item ${currentPage === 2 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}  >
        &gt;
      </button>
    </li>
  </ul>
</div>

    </div>
  );
}


export default App
