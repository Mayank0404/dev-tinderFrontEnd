import {  Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {addUser} from "../utils/userSlice"
import { useEffect } from "react";

const Body = () => {
  const navigate=useNavigate();
  const dispact=useDispatch();
  const userData=useSelector((store)=>store.user);
  // Animation Variants for the Background
  const backgroundVariants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      transition: {
        duration: 10, // Duration for one full animation cycle
        repeat: Infinity, // Infinite looping
        ease: "linear",
      },
    },
  };
  const fetchUser=async()=>{
    try {
      if(userData) return;
      const res=await axios.get(BASEURL+"/profile/view",{
        withCredentials:true,
      })
      dispact(addUser(res.data));
    } 
    catch (error) {
      if(error.status===401){
        navigate("/login")
      }
      console.log(error);
      
    }
  }
useEffect(()=>{
  if (!userData) {
    fetchUser();
  }
    
}, []);



  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ffafbd 0%, #ffc3a0 25%, #2193b0 50%, #6dd5ed 75%, #cc2b5e 100%)",
          backgroundSize: "300% 300%", // Larger size for the gradient to move
        }}
        variants={backgroundVariants}
        animate="animate"
      ></motion.div>

      <NavBar />
      <div className="flex flex-col justify-between">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
