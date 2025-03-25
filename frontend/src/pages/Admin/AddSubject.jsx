import { useState } from "react";
 import { toast } from "react-toastify"; // Import Toastify
 import axios from "axios"; // Make sure to install axios if you haven't already
 
 const AddSubject = () => {
   const [subjectName, setSubjectName] = useState("");
   const [subjectCode, setSubjectCode] = useState("");
   const [subjectClass, setSubjectClass] = useState("");
   const [session, setSession] = useState("");
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     const newSubject = {
       name: subjectName,
       code: subjectCode,
       class: subjectClass,
       session: session,
     };
 
     try {
       // Send the new subject to the server
       const response = await axios.post(`${import.meta.env.VITE_LINK}/api/subjects/add`, newSubject,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
       }); // Adjust the URL as needed
       console.log("New Subject Added:", response.data);
 
       // Show success toast
       toast.success("Subject added successfully!");
 
       // Reset form
       setSubjectName("");
       setSubjectCode("");
       setSubjectClass("");
       setSession("");
     } catch (error) {
       console.error("Error adding subject:", error);
       toast.error("Failed to add subject. Please try again.");
     }
   };
 
   return (
     <div className="flex justify-center items-center h-screen w-full">
       <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
         <h2 className="text-2xl font-semibold text-center mb-6">Add New Subject</h2>
         <form onSubmit={handleSubmit} className="space-y-4">
           <div className="form-control">
             <label htmlFor="subjectName" className="label">
               <span className="label-text">Subject Name:</span>
             </label>
             <input
               type="text"
               id="subjectName"
               className="input input-bordered w-full"
               value={subjectName}
               onChange={(e) => setSubjectName(e.target.value)}
               required
             />
           </div>
 
           <div className="form-control">
             <label htmlFor="subjectCode" className="label">
               <span className="label-text">Subject Code:</span>
             </label>
             <input
               type="text"
               id="subjectCode"
               className="input input-bordered w-full"
               value={subjectCode}
               onChange={(e) => setSubjectCode(e.target.value)}
               required
             />
           </div>
 
           <div className="form-control">
             <label className="label">
               <span className="label-text">Class</span>
             </label>
             <select
               name="class"
               className="input input-bordered w-full"
               value={subjectClass}
               onChange={(e) => setSubjectClass(e.target.value)}
               required
             >
               <option value="">Select Class</option>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
               <option value="6">6</option>
               <option value="7">7</option>
               <option value="8">8</option>
               <option value="9">9</option>
               <option value="10">10</option>
             </select>
           </div>
 
           <div className="form-control">
             <label className="label">
               <span className="label-text">Session</span>
             </label>
             <select
               name="session"
               className="input input-bordered w-full"
               value={session}
               onChange={(e) => setSession(e.target.value)}
               required
             >
               <option value="">Select Session</option>
               <option value="2024-2025">2024-2025</option>
               <option value="2023-2024">2023-2024</option>
               <option value="2022-2023">2022-2023</option>
               <option value="2021-2022">2021-2022</option>
               {/* Add more session options as needed */}
             </select>
           </div>
 
           <button type="submit" className="btn btn-primary text-white w-full mt-4">
             Add Subject
           </button>
         </form>
       </div>
     </div>
   );
 };
 
 export default AddSubject;