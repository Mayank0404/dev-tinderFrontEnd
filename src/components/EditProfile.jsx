import { motion } from "framer-motion";
import { useState } from "react";
import UserCard from "./UserCard";
import { BASEURL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const EditProfile = ({ user }) => {
    const dispatch=useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [skills, setSkills] = useState(user.skills || []);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const[showToast,setShowToast]=useState(false);

  const saveProfile=async ()=>{
    setError("");
    try {
        const res=await axios.patch(BASEURL+"/profile/edit",{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,skills
        },{
            withCredentials:true,
        })
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setInterval(() => {
          setShowToast(false);
        }, 2000);
        
        
        // dispatch(addUser(res.data.data));
    } catch (error ) {
setError(error?.response?.data || "SOMETHING WENT WRONG");
        
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
<div>
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
          <h2 className="card-title justify-center">Update Profile</h2>
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
                <span className="label-text">First Name</span>
              </div>
              <input
                value={firstName}
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </motion.label>

            <motion.label
              className="form-control w-full max-w-xs py-4"
              custom={1} // Delay for stagger effect
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                value={lastName}
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </motion.label>

            <motion.label
              className="form-control w-full max-w-xs py-4"
              custom={1} // Delay for stagger effect
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                value={age}
                type="number"
                className="input input-bordered w-full max-w-xs"
                min="18" // Set minimum age
                max="100" // Set maximum age
                step="1" // Ensure the value changes in whole numbers
                onChange={(e) => setAge(e.target.value)}
              />
            </motion.label>

            <motion.label
              className="form-control w-full max-w-xs py-4"
              custom={1} // Delay for stagger effect
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select input-bordered w-full max-w-xs"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </motion.label>

            <motion.label
              className="form-control w-full max-w-xs py-4"
              custom={1} // Delay for stagger effect
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="label">
                <span className="label-text">PhotoUrl</span>
              </div>
              <input
                value={photoUrl}
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </motion.label>

            <motion.label
              className="form-control w-full max-w-xs py-4"
              custom={1} // Delay for stagger effect
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                value={about}
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAbout(e.target.value)}
              />
            </motion.label>

            <motion.label
              className="form-control w-full max-w-xs py-4"
              custom={1} // Delay for stagger effect
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="label">
                <span className="label-text">Skills</span>
              </div>
              <input
                value={skills.join(", ")} // Show skills as comma-separated string in the input
                type="text"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  const skillsArray = e.target.value
                    .split(",")
                    .map((skill) => skill.trim()); // Split the input into an array and trim spaces
                  setSkills(skillsArray);
                }}
              />
            </motion.label>
            <p className="text-red-500">{error}</p>

          </div>
          {/* Button with Hover and Tap Animations */}
          <div className="card-actions justify-center">
            <motion.button
            onClick={saveProfile}
              className="btn btn-primary"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              SAVE PROFILE
            </motion.button>
          </div>
        </div>
      </motion.div>
      <div>
        <div className="ml-8">
          <UserCard user={{ firstName, lastName, age, skills, about, gender, photoUrl }} />
        </div>
      </div>
      
      
    </div>
   {showToast &&<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated Successfully</span>
  </div>
</div>}
    </div>
  );
};

export default EditProfile;
