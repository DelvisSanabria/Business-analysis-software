"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useState,useEffect,useRef, useContext } from "react";
import { SessionContext } from "../../Context/Session";
import NavBar from "../components/NavBar";
import { antonio } from "../ui/fonts";
import axios from "axios";

export default function SignIn() {
const serverURL = "http://localhost:3001";
const {userSession, setUserSession} = useContext(SessionContext)
const router = useRouter();

const [error, setError] = useState({
  email: "",
  password: "",
});

const [input, setInput] = useState({
  email: "",
  password: "",
})

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
      const createSession = await axios.post(`${serverURL}/auth/login`, input, {
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
        setInput({email: "" , password: ""});
      }
  } catch ({ name, message, response }) {
    console.error(`${name}: ${message}`);
  }
};
const handleChange = (event) => {
  const { name, value } = event.target;
  setInput({ ...input, [name]: value });
}

const handleValidation = (event) => {
  const { email, password } = input;
  const regexEmail = /^[a-z0-9.-]+@[a-z0-9-]+(\.[a-z]{2,4}){1,3}$/i;
if (!email) {
     event.preventDefault();
     setError((prev) => ({...prev, email: "Enter your email address",}));
  } else if (!regexEmail.test(input.email)) {
     setError((prev) => ({...prev, email: "Enter a valid email address"}));
  } else {
     setError((prev) => ({...prev, email: "",}));
     event.returnValue = true;
  }
if (!password) {
     event.preventDefault();
     setError((prev) => ({...prev, password: "type your password",}));
} else {
     setError((prev) => ({...prev, password: "",}));
     event.returnValue = true;
  }
}
useEffect(() => {
   if (!input.email && !input.password) {
      setError({email: "", password: ""});
   }
}, [input])
  return (
    <main className={`flex min-h-[80vh] flex-1 flex-col items-center justify-between ${antonio.className}`}>
      <section className="bg-[url('/general/Background-yellow.png')] grid grid-rows-[130px_1fr_100px] place-items-center m-5 w-[95vw] h-mx py-3 rounded-xl">
        <NavBar styles={"w-full"} />
        <div className="bg-[#36323E] w-[60vw] h-max py-3 rounded-xl shadow-2xl shadow-[#FFCE3E] flex flex-col justify-center items-center md:w-[35vw]">
          <p className={` antialiased text-white text-2xl`}>Sign-in</p>
          <form className="flex flex-col justify-center items-center font-extralight text-sm"
          onSubmit={handleSubmit}
          >
              <div className="flex flex-col py-3 text-white font-extralight">
                <label htmlFor="Email" className="my-2">
                  Email
                </label>
                <input
                type="text"
                placeholder="Email"
                name="email"
                className={`rounded-[10px] text-[#36323E] pl-4 py-1 w-[200px] outline-none md:w-[300px] ${error.email ? "border-[#DC3545]" : ""}`}
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
                className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[300px] ${error.password ? "border-[#DC3545]" : ""}`}
                title={"The password must contain between 8 and 16 characters and at least one of the following:n- Uppercasen- Lowercasen- Digitn- A special character between: !@#$%^&*/"}
                value={input.password}
                onChange={handleChange}
              />
              <div className="relative">
                <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">{error.password}</span>
              </div>
              <div className="flex flex-col lg:items-center gap-[10px] pt-3">
                <p className="text-white text-xs font-extralight tracking-widest">Forgot your password? <Link href="/forgot-password" className="text-[#FFCE3E]">Recover it</Link></p>
              </div>
              </div>  
              <div className="my-4">
                <button className="bg-[#FFCE3E] transition ease-in-out delay-75 duration-150 hover:bg-[#cda52e] hover:scale-105 text-[#36323E] text-sm font-extralight py-2 px-4 rounded-[10px] w-[150px]"
                id="submit"
                onClick={handleValidation}
                type="submit"
                >Login</button>
              </div>
            </form>
        </div>
        <div>
          <span className="text-white text-xs font-extralight tracking-widest">Don't have an account? <Link href="/sign-up" className="text-[#FF3E4A] hover:text-[#c2333d]">Sign-up here</Link></span>
        </div>
      </section>
      <footer className="flex items-center justify-center py-6">
        <Image src={"/general/Wuau_Logo-white.png"} width={150} height={100} />
      </footer>
    </main>
  );
}
