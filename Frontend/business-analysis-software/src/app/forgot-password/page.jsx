"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useState,useEffect,useRef } from "react";
import NavBar from "../components/NavBar";
import { antonio } from "../ui/fonts";
import axios from "axios";

export default function ForgotPassword() {
const serverURL = "http://localhost:3001";
const router = useRouter();
const [user, setUser] = useState({
  password: "",
});

const [error, setError] = useState({
  email: "",
  userKey: "",
  password: "",
  confirmPassword: ""
});
const [input, setInput] = useState({
  email: "",
  userKey: "",
  password: "",
  confirmPassword: ""
});
const [time, setTime] = useState(new Date(0, 0, 0, 0, 5));
const [emailSent, setEmailSent] = useState(false);
const [keySuccess, setKeySuccess] = useState(false);
const button = useRef();

const submitEmail = async () => {
  try {
     const regexEmail = /^[a-z0-9.-]+@[a-z0-9-]+(\.[a-z]{2,4}){1,3}$/i;
     if (input.email === "") {
        setError((prev) => ({ ...prev, email: "Enter your email address" }));
        return;
     } else if (!regexEmail.test(input.email)) {
        setError((prev) => ({ ...prev, email: "Enter a valid email address" }));
        return;
     }
     setError((prev) => ({ ...prev, email: "" }));
     const response = await axios.post(`${serverURL}/passRecovery/sendRecoveryCode`, input, {
        headers: {
           "Content-Type": "application/json"
        }
     });
     if (response.status === 200) {
        setEmailSent(true);
     }
  } catch ({ name, message, response }) {
     if (response.data) {
        setError((prev) => ({ ...prev, email: response.data.email }));
     }
     console.error(`${name}: ${message}`);
  }
}
const submitKey = async () => {
  try {
     const response = await axios.post(`${serverURL}/passRecovery/codeValidation`, input, {
        headers: {
           "Content-Type": "application/json"
        }
     });
     if (response.status === 200) {
        setKeySuccess(true);
     }
  } catch ({ name, message, response }) {
     if (response.data) {
        setError((prev) => ({ ...prev, userKey: response.data.userKey }));
     }
     console.error(`${name}: ${message}`);
  }
}
const submitPassword = async () => {
  try {
    const encodedEmail = encodeURIComponent(input.email);
     const response = await axios.patch(`${serverURL}/auth/update/${encodedEmail}`, user, {
        headers: {
           "Content-Type": "application/json"
        }
     });
     if (response.status === 201) {
        alert("Password changed successfully");
        router.push("/sign-in");
     }
  } catch ({ name, message, response }) {
     if (response.data) {
        setError((prev) => ({ ...prev, password: response.data.password }));
     }
     console.error(`${name}: ${message}`);
  }
}

useEffect(() => {
  if (emailSent) {
     const timer = setInterval(() => {
        setTime(time => {
           if (time.getMinutes() === 0 && time.getSeconds() === 0) {
              clearInterval(timer);
              return time;
           } else {
              const newTime = new Date(time.getTime());
              newTime.setSeconds(newTime.getSeconds() - 1);
              return newTime;
           }
        });
     }, 1000);
     return () => clearInterval(timer);
  }
}, [emailSent]);

let minutes = time.getMinutes().toString().padStart(2, "0");
let seconds = time.getSeconds().toString().padStart(2, "0");
let timeString = `${minutes}:${seconds}`;

const handleChange = (event) => {
  const { name, value } = event.target;
  setInput((input) => ({ ...input, [name]: value }));
}

const handleValidation = () => {
  const { password, confirmPassword } = input;
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&.*/])[^<>{}:;'"?,\s]{8,16}$/;
  let isValid = true;
  if (password) {
     if (regexPassword.test(password)) {
        setError((error) => ({ ...error, password: "" }));
        if (!confirmPassword) {
           isValid = false;
        } else if (password !== confirmPassword) {
           setError((error) => ({ ...error, confirmPassword: "Password doesn't match" }));
           setUser((user) => ({ ...user, password: "" }));
           isValid = false;
        } else {
           setError((error) => ({ ...error, password: "", confirmPassword: "" }));
           setUser((user) => ({ ...user, password: password }));
        }
     } else {
        setError((error) => ({ ...error, password: "Password is invalid" }));
        setUser((user) => ({ ...user, password: "" }));
        isValid = false;
     }
  } else {
     setError((error) => ({ ...error, password: "", repPassword: "" }));
     isValid = false;
  }
  if (button.current) {
     button.current.disabled = !isValid;
  }
}

useEffect(() => {
  handleValidation();
}, [input.password, input.confirmPassword, keySuccess]);
  return (
    <main
      className={`flex min-h-[80vh] flex-1 flex-col items-center justify-between ${antonio.className}`}
    >
      <section className="bg-[url('/general/Background-red.png')] grid grid-rows-[130px_1fr_100px] place-items-center m-5 w-[95vw] h-mx py-3 rounded-xl">
        <NavBar styles={"w-full"} />
        <div className="bg-[#36323E] w-[60vw] mt-10 h-max py-3 rounded-xl shadow-2xl flex flex-col justify-center items-center md:w-[35vw]">
          <p className={` antialiased text-white text-2xl`}>Recover password</p>
          <form className="flex flex-col justify-center items-center font-extralight text-sm">
            {!keySuccess && (
              <>
                <div className="flex flex-col py-3 text-white font-extralight">
                  <label htmlFor="Email" className="my-2">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className={`rounded-[10px] text-[#36323E] pl-4 py-1 w-[200px] outline-none md:w-[300px] ${
                      error.email ? "border-[#DC3545]" : ""
                    }`}
                    value={input.email}
                    onChange={handleChange}
                  />
                  <div className="relative">
                    <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">
                      {error.email}
                    </span>
                  </div>
                </div>
                <div className="my-4">
                  <button
                    className="bg-[#FFCE3E] transition ease-in-out delay-75 duration-150 hover:bg-[#cda52e] hover:scale-105 text-[#36323E] text-sm font-extralight py-2 px-4 rounded-[10px] w-[150px]"
                    onClick={submitEmail}
                    type="button"
                  >
                    Recover
                  </button>
                </div>
                <div
                  className={`flex flex-col py-3 text-white font-extralight w-full ${
                    !emailSent && "hidden"
                  }`}
                >
                  <p className="flex flex-col text-[#FFFFFF] text-sm">
                    Enter the recovery key you obtained{" "}
                    <span className="font-medium">{timeString}</span>
                  </p>
                  <label htmlFor="Password" className="my-2">
                    Secret Key:
                  </label>
                  <input
                    id="userKey"
                    type="text"
                    name="userKey"
                    value={input.userKey}
                    onChange={handleChange}
                    className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[300px] ${
                      error.userKey ? "border-[#DC3545]" : ""
                    }`}
                  />
                  <div className="relative my-3">
                    <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">
                      {error.userKey}
                    </span>
                  </div>
                  <div className="my-4 flex place-content-center">
                    <button
                      className="bg-[#FFCE3E] transition ease-in-out delay-75 duration-150 hover:bg-[#cda52e] hover:scale-105 text-[#36323E] text-sm font-extralight py-2 px-4 rounded-[10px] w-[150px]"
                      onClick={submitKey}
                      type="button"
                    >
                      Validate key
                    </button>
                  </div>
                </div>
              </>
            )}
            {keySuccess && (
              <>
                <div className="flex flex-col py-3 text-white font-extralight">
                  <label htmlFor="Password" className="my-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[300px] ${
                      error.password ? "border-[#DC3545]" : ""
                    }`}
                    title={
                      "The password must contain between 8 and 16 characters and at least one of the following:n- Uppercasen- Lowercasen- Digitn- A special character between: !@#$%^&*/"
                    }
                    value={input.password}
                    onChange={handleChange}
                  />
                  <div className="relative my-3">
                    <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">
                      {error.password}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col py-3 text-white font-extralight">
                  <label htmlFor="Confirm Password" className="my-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[300px] ${
                      error.confirmPassword ? "border-[#DC3545]" : ""
                    }`}
                    value={input.confirmPassword}
                    onChange={handleChange}
                  />
                  <div className="relative my-3">
                    <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">
                      {error.confirmPassword}
                    </span>
                  </div>
                </div>
                <div className="my-4 ">
                  <button
                    className="bg-[#FFCE3E] transition ease-in-out delay-75 duration-150 hover:bg-[#cda52e] hover:scale-105 text-[#36323E] text-sm font-extralight py-2 px-4 rounded-[10px] w-[150px]"
                    ref={button}
                    id="submit"
                    onClick={submitPassword}
                    type="button"
                  >
                    Change password
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
      <footer className="flex items-center justify-center py-6">
        <Image src={"/general/Wuau_Logo-white.png"} width={150} height={100} />
      </footer>
    </main>
  );
}
