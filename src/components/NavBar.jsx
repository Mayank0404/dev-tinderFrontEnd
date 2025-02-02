import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
const NavBar = () => {
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const navbarVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, type: "spring" } },
  };
  const logoutHandler=async()=>{
    try {
      await axios.post("http://localhost:7777/logout",{},{
        withCredentials:true,
      })
      dispatch(removeUser());
      return navigate("/login");
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <motion.div
      className="navbar bg-base-300 shadow-sm"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      {/* Navbar Title */}
      <div className="flex-1">
        <Link
        to="/"
          className="btn btn-ghost text-xl"
          
        >
          DEV TINDER 🧑‍💻
        </Link>
      </div>

      {/* Avatar and Dropdown */}
      {user && <div className="flex gap-2 items-center">
            <span className="text-base font-medium">{user.firstName}</span>

        <div className="dropdown dropdown-end mx-5  ">

          
          <motion.div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
          >

           <div className="w-10 rounded-full">
              <img
                alt="Avatar"
                src={user.photoUrl}
              />
            </div>
          </motion.div>

          {/* Dropdown Menu */}
          <ul
            
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
           
          >
            {/* Profile */}
            <li
            
              className="cursor-pointer rounded-lg p-2"
            >
              <Link to="/profile">Proflie</Link>
            </li>

            {/* Settings */}
            <li
             
              className="cursor-pointer rounded-lg p-2"
            >
              <Link to="/connections">Connections</Link>
            </li>

            {/* Logout */}
            <li
            
              className="cursor-pointer rounded-lg p-2"
            >
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </div>
      </div>}
    </motion.div>
  );
};

export default NavBar;
