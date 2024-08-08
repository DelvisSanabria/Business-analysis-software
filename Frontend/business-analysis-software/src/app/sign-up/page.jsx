"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useState,useEffect,useRef, useContext } from "react";
import { SessionContext } from "../../Context/Session";
import NavBar from "../components/NavBar";
import { antonio } from "../ui/fonts";
import axios from "axios";

export default function SignUp() {
const serverURL = "http://localhost:3001";
const {userSession, setUserSession} = useContext(SessionContext)
const router = useRouter();
const [user, setUser] = useState({
  name: "",
  lastName: "",
  email: "",
  password: "",
});

const [error, setError] = useState({
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword:"",
});

const [input, setInput] = useState({
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
})

const button = useRef();

const handleSubmit = async () => {
  try {
    const response = await axios.post(`${serverURL}/auth/signup`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      const loginUser = {
        email: response.data.email,
        password: user.password,
      }
      const createSession = await axios.post(`${serverURL}/auth/login`, loginUser, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (createSession.status === 200) {
        setUserSession({
          user:createSession.data.user,
          token: createSession.data.token,
        });
        router.push("/");
        const keys = [
          ,
          "name",
          "lastName",
          "email",
          "password",
          "confirmPassword",
        ];
        for (const key of keys) {
          if (input[key]) {
            setInput((prev) => ({ ...prev, [key]: "" }));
          }
          if (error[key]) {
            setError((prev) => ({ ...prev, [key]: "" }));
          }
          if (user[key]) {
            setUser((prev) => ({ ...prev, [key]: "" }));
          }
        }
      }
    }
  } catch ({ name, message, response }) {
    console.error(`${name}: ${message}`);
  }
};
const handleChange = (event) => {
  const { name, value } = event.target;
  setInput({ ...input, [name]: value });
}

const handleValidation = () => {
  const { password, confirmPassword } = input;
  const regexList = {
     name: /^[a-zñ áéíóúñÁÉÍÓÚÑ]+$/i,
     lastName: /^[a-zñ áéíóúñÁÉÍÓÚÑ]+$/i,
     email: /^[a-z0-9.-]+@[a-z0-9-]+(\.[a-z]{2,4}){1,3}$/i,
     password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&.*/])[^<>{}:;'"?,\s]{8,16}$/,
  };

  const message = {
     name: "The name is invalid",
     lastName: "Last name is invalid",
     email: "The email is invalid",
     password: "Password is invalid",
  };
  let user = {};
  let errors = {};
  let isValid = true;
  for (let field in input) {
     if (input[field]) {
        if (regexList[field] && !regexList[field].test(input[field])) {
           errors = { ...errors, [field]: message[field] };
           user = { ...user, [field]: "" };
           isValid = false;
        } else {
           errors = { ...errors, [field]: "" };
           user = { ...user, [field]: input[field] };
        }
     }else {
        errors = { ...errors, [field]: "" };
        isValid = false;
     }
  }
  if (password && regexList.password.test(password)) {
     if (!confirmPassword) {
        isValid = false;
     } else if (password !== confirmPassword) {
        errors = { ...errors, confirmPassword: "Password does not match" };
        user = { ...user, password: "" };
        isValid = false;
     } else {
        errors = { ...errors, confirmPassword: "" };
        user = { ...user, password };
     }
  }
  button.current.disabled = !isValid;
  setError((prev) => ({ ...prev, ...errors }));
  setUser((prev) => ({ ...prev, ...user }));
}
useEffect(() => {
  handleValidation();
}, [input]);
  return (
    <main className={`flex min-h-[80vh] flex-1 flex-col items-center justify-between ${antonio.className}`}>
      <section className="bg-[url('/general/Background-yellow.png')] grid grid-rows-[130px_1fr_100px] place-items-center m-5 w-[95vw] h-mx py-3 rounded-xl">
        <NavBar styles={"w-full"} />
        <div className="bg-[#36323E] w-[60vw] h-max py-3 rounded-xl shadow-2xl shadow-[#FFCE3E] flex flex-col justify-center items-center md:w-[35vw]">
          <p className={` antialiased text-white text-2xl`}>Sign-up</p>
          <div className="flex flex-col justify-center items-center font-extralight text-sm">
              <div className="flex flex-col py-3 text-white">
                <label htmlFor="First name" className="my-2">
                  First name
                </label>
              <input
                type="text"
                placeholder="First name"
                name="name"
                className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[220px] lg:w-[300px] ${error.name ? "border-[#DC3545]" : ""}`}
                value={input.name}
                onChange={handleChange}
              />
              <div className="relative">
                <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">{error.name}</span>
              </div>
              </div>
              <div className="flex flex-col py-3 text-white font-extralight">
                <label htmlFor="Last name" className="my-2">
                  Last name
                </label>
                <input
                type="text"
                placeholder="Last name"
                name="lastName"
                className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[220px] lg:w-[300px] ${error.lastName ? "border-[#DC3545]" : ""}`}
                value={input.lastName}
                onChange={handleChange}
                />
                <div className="relative">
                  <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">{error.lastName}</span>
                </div>
              </div> 
              <div className="flex flex-col py-3 text-white font-extralight">
                <label htmlFor="Email" className="my-2">
                  Email
                </label>
                <input
                type="text"
                placeholder="Email"
                name="email"
                className={`rounded-[10px] text-[#36323E] pl-4 py-1 w-[200px] outline-none md:w-[220px] lg:w-[300px] ${error.email ? "border-[#DC3545]" : ""}`}
                value={input.email}
                onChange={handleChange}
              />
              <div className="relative">
                <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">{error.email}</span>
              </div>
              </div> 
              <div className="flex flex-col py-3 text-white font-extralight">
                <label htmlFor="Password" className="my-2">
                  Password
                </label>
                <input
                type="password"
                placeholder="Password"
                name="password"
                className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[220px] lg:w-[300px] ${error.password ? "border-[#DC3545]" : ""}`}
                title={"The password must contain between 8 and 16 characters and at least one of the following:n- Uppercasen- Lowercasen- Digitn- A special character between: !@#$%^&*/"}
                value={input.password}
                onChange={handleChange}
              />
              <div className="relative">
                <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">{error.password}</span>
              </div>
              </div> 
              <div className="flex flex-col py-3 text-white font-extralight">
                <label htmlFor="Confirm Password" className="my-2">
                  Confirm Password
                </label>
                <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[220px] lg:w-[300px] ${error.confirmPassword ? "border-[#DC3545]" : ""}`}
                value={input.confirmPassword}
                onChange={handleChange}
              />
              <div className="relative">
                <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">{error.confirmPassword}</span>
              </div>
              </div> 
              <div className="my-4">
                <button className="bg-[#FFCE3E] transition ease-in-out delay-75 duration-150 hover:bg-[#cda52e] hover:scale-105 text-[#36323E] text-sm font-extralight py-2 px-4 rounded-[10px] w-[150px]"
                ref={button}
                id="submit"
                onClick={handleSubmit}
                type="button"
                >Create account</button>
              </div>
            </div>
        </div>
        <div>
          <span className="text-white text-xs font-extralight tracking-widest">Already have an account? <Link href="/sign-in" className="text-[#FF3E4A] hover:text-[#c2333d]">Sign-in here</Link></span>
        </div>
      </section>
      <footer className="flex items-center justify-center py-6">
        <Image src={"/general/Wuau_Logo-white.png"} width={150} height={100} />
      </footer>
    </main>
  );
}
