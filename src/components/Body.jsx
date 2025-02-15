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
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      transition: {
        duration: isMobile ? 40 : 30, // Slow animation
        repeat: Infinity,
        ease: "linear",
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
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []); // Run once on mount

  return (
    <div className="relative min-h-screen">

      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/frozen-arctic-cracked-ice-composition-chunks-melting-ice-sea-against-background-clouds-sunshine-vector-illustration_1284-81849.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        variants={backgroundVariants}
        animate="animate"
      ></motion.div>

      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <NavBar />
      </div>

      {/* Add padding so content doesn't hide under navbar */}
      <div className="flex flex-col justify-between pt-20">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Body;
  