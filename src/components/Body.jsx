import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  // Check if device is mobile
  const isMobile = window.innerWidth < 768;

  // Animation Variants for the Background
  const backgroundVariants = {
    animate: {
      backgroundPosition: ["0% 0%", "50% 50%", "100% 100%", "0% 0%"], // Slow movement across the background
      scale: [1, 1.02, 1], // Slight zoom effect
      transition: {
        duration: 60, // Slower transition (60 seconds)
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const fetchUser = async () => {
    try {
      if (userData) return;
      const res = await axios.get(BASEURL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []); // Empty dependency to run once

  return (
    <div className="relative min-h-screen">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/frozen-arctic-cracked-ice-composition-chunks-melting-ice-sea-against-background-clouds-sunshine-vector-illustration_1284-81849.jpg?t=st=1738594227~exp=1738597827~hmac=b9034b6790121df98d2e93b3a788a62dffe39cacc2cdf315b193ac4f80979c12&w=1380')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Parallax effect
        }}
        variants={backgroundVariants}
        animate="animate"
      ></motion.div>

      {/* Layout Structure */}
      <NavBar />
      <div className="flex flex-col justify-between">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
