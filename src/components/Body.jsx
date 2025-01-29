import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
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

      {/* Fixed Content */}
      <NavBar />
      <div className="flex flex-col justify-between">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
