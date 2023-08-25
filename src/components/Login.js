import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { query, where, getDocs, doc } from "firebase/firestore";
import { useRef } from "react";
import bcrypt from "bcryptjs";
import { Appstate } from "../App";
import { usersRef } from "../firebase/firebase";
import Footer from "./Footer";
import "../App.css"

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  

  const login = async () => {
    setLoading(true);
    try {
      console.log("Form Data:", form); // Debugging: Check form input values
      
      const querySnapshot = await getDocs(query(usersRef, where('mobile', '==', form.mobile)));
      console.log("Query Snapshot:", querySnapshot); // Debugging: Check query results
      
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        console.log("User Data:", _data); // Debugging: Check user data from Firestore
        
        if (form.password === _data.password) {
          setForm({
            loading: false,
            login: true,
            userName: _data.name
            
          });
          
          console.log("Logged In"); // Debugging: Check if login logic is reached
          swal({
            title: "Logged In, now you can add a movie, and RATE A MOVIE!!!",
            icon: "success",
            buttons: false,
            timer: 6000
          })
          
          navigate('/addmovie');
        } else {
          console.log("Invalid Credentials"); // Debugging: Check if invalid credentials logic is reached

          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      });
    } catch (error) {
      console.error("Login Error:", error.message); // Debugging: Log any caught errors
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex-col flex mt-4 items-center">
      <h1 className="text-xl font-bold"> Login</h1>

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-600">
            Mobile Number
          </label>
          <input
            type={"number"}
            id="message"
            name="message"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            id="message"
            name="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <button
        onClick={login}
        class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
      >
        {loading ? <TailSpin height={25} color="white" /> : "Login"}
      </button>
      <div>
        <p>
          Do not have an account?{" "}
          <Link to={"/signup"}>
            <span className="text-blue-500">Signup</span>
          </Link>
        </p>
      </div>
      <Footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Your App. All rights reserved.</p>
      </div>
    </Footer>    </div>
  );
};

export default Login;
