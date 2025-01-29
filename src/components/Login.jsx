import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/constants";


const Login = () => {
 const navigate=useNavigate();

   const[emailId,setEmailId]=useState("mayank@gmail.com");
  const[password,setPassword]=useState("Mayank@1234");
  const dispatch=useDispatch();
  const handleLogin=async ()=>{
    try {
      const res=await axios.post(BASEURL+"/login",{
        emailId,password
      },{
        withCredentials:true,
      })
      dispatch(addUser(res.data)); //setting data in my store using redux toolkit
      navigate("/")
    } catch (error) {
      console.log(error);
      
    }
  }
 
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.2, duration: 0.5 },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex justify-center my-10">
      {/* Animate the Card */}
      <motion.div
        className="card bg-base-300 w-96 shadow-sm"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="card-body">
          {/* Card Title */}
          <h2 className="card-title justify-center">LOGIN</h2>
          <div>
            {/* Email Field */}
            <motion.label
              className="form-control w-full max-w-xs py-4"
              custom={1} // Delay for stagger effect
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e)=>{
                  setEmailId(e.target.value);
                }}

              />
            </motion.label>

            {/* Password Field */}
            <motion.div
              className="py-4"
              custom={2} // Delay for stagger effect
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e)=>{
                    setPassword(e.target.value)
                  }}
                />
              </label>
            </motion.div>
          </div>

          {/* Button with Hover and Tap Animations */}
          <div className="card-actions justify-center">
            <motion.button
            onClick={handleLogin}
              className="btn btn-primary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              LOGIN
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
