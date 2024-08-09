"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { useState,useEffect,useRef, useContext } from "react";
import { SessionContext } from "../../Context/Session";
import NavBar from "../components/NavBar";
import { antonio } from "../ui/fonts";
import axios from "axios";
import Cookies from 'js-cookie';

export default function myAccount() {
const serverURL = "http://localhost:3001";
const { userSession, setUserSession,updateUserSession } = useContext(SessionContext);

useEffect(() => {
  if (userSession === null) {
    const storedUserSession = Cookies.get('userSession');
    if (storedUserSession) {
      updateUserSession(JSON.parse(storedUserSession));
    }
  }
}, [userSession, setUserSession]);

console.log(userSession);
const userRequest = userSession?.user;
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
});

const [input, setInput] = useState({
  name: "",
  lastName: "",
  email: "",
  password: "",
})

const button = useRef();

const handleSubmitUpdate = async () => {
  const encodedEmail = encodeURIComponent(userSession.user.email);
  console.log(user)
  try {
    const response = await axios.patch(`${serverURL}/users/update/${encodedEmail}`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSession.token}`,
      },
    });
    if (response.status === 201) {
      console.log(user)
      console.log(response.data);
        const existingToken = userSession.token;

        const updatedUserSession = {
          user: response.data,
          token: existingToken,
        };

        updateUserSession(updatedUserSession);
        Cookies.set('userSession', JSON.stringify(updatedUserSession),
        {
          expires: 2/24,
          secure: false,
          /* httpOnly: true,
          sameSite: 'strict' */
        });
        const keys = [
          ,
          "name",
          "lastName",
          "email",
          "password",
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
  } catch ({ name, message, response }) {
    console.error(`${name}: ${message}`);
  }
};
const handleChange = (event) => {
  const { name, value } = event.target;
  setInput({ ...input, [name]: value });
}

const handleValidation = () => {
  const { password } = input;
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
  if (password) {
    if (!regexList.password.test(password)) {
      errors = { ...errors, password: message.password };
      user = { ...user, password: "" };
      isValid = false;
    } else {
      errors = { ...errors, password: "" };
      user = { ...user, password };
    }
  } else {
    errors = { ...errors, password: "" };
    isValid = false;
  }
/* button.current.disabled = !hasValue  || !isValid; */
  setError((prev) => ({ ...prev, ...errors }));
  setUser((prev) => ({ ...prev, ...user }));
}
useEffect(() => {
  handleValidation();
}, [input]);
  return (
    <main
      className={`flex min-h-[80vh] flex-1 flex-col items-center justify-between ${antonio.className}`}
    >
      <section className="bg-[url('/general/Background-yellow.png')] grid grid-rows-[130px_1fr_100px] place-items-center m-5 w-[95vw] h-mx py-3 rounded-xl">
        <NavBar styles={"w-full"} />
        <div className="grid grid-rows-2 items-center justify-center gap-4 md:flex md:flex-row">
          <div className="bg-[#36323E] w-[60vw] h-max py-3 rounded-xl shadow-2xl shadow-[#FFCE3E] flex flex-col justify-center items-center md:w-[35vw]">
            <p className={` antialiased text-white text-2xl`}>My account</p>
            <div className="flex flex-col justify-center items-center font-extralight text-sm">
              <div className="flex flex-col py-3 text-white">
                <label htmlFor="First name" className="my-2">
                  First name
                </label>
                <input
                  type="text"
                  placeholder={userSession?.user?.name}
                  name="name"
                  className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[220px] lg:w-[300px] ${
                    error.name ? "border-[#DC3545]" : ""
                  }`}
                  value={input.name}
                  onChange={handleChange}
                />
                <div className="relative">
                  <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">
                    {error.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-col py-3 text-white font-extralight">
                <label htmlFor="Last name" className="my-2">
                  Last name
                </label>
                <input
                  type="text"
                  placeholder={userSession?.user?.lastName}
                  name="lastName"
                  className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[220px] lg:w-[300px] ${
                    error.lastName ? "border-[#DC3545]" : ""
                  }`}
                  value={input.lastName}
                  onChange={handleChange}
                />
                <div className="relative">
                  <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">
                    {error.lastName}
                  </span>
                </div>
              </div>
              <div className="flex flex-col py-3 text-white font-extralight">
                <label htmlFor="Email" className="my-2">
                  Email
                </label>
                <input
                  type="text"
                  placeholder={userSession?.user?.email}
                  name="email"
                  className={`rounded-[10px] text-[#36323E] pl-4 py-1 w-[200px] outline-none md:w-[220px] lg:w-[300px] ${
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
              <div className="flex flex-col py-3 text-white font-extralight">
                <label htmlFor="Password" className="my-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={`rounded-[10px] text-[#36323E] pl-4 py-1 outline-none w-[200px] md:w-[220px] lg:w-[300px] ${
                    error.password ? "border-[#DC3545]" : ""
                  }`}
                  title={
                    "The password must contain between 8 and 16 characters and at least one of the following:n- Uppercasen- Lowercasen- Digitn- A special character between: !@#$%^&*/"
                  }
                  value={input.password}
                  onChange={handleChange}
                />
                <div className="relative">
                  <span className="absolute -top-[-5px] md:-top-[-5px] indent-1 -bottom-[9px] text-[0.8em] [color:_rgb(255,0,0)]">
                    {error.password}
                  </span>
                </div>
              </div>
              <div className="my-4">
                <button
                  className="bg-[#FFCE3E] transition ease-in-out delay-75 duration-150 hover:bg-[#cda52e] hover:scale-105 text-[#36323E] text-sm font-extralight py-2 px-4 rounded-[10px] w-[150px]"
                  ref={button}
                  id="submit"
                  onClick={handleSubmitUpdate}
                  type="button"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#36323E] w-[60vw] h-[476px] py-3 rounded-xl shadow-2xl shadow-[#FFCE3E] flex flex-col justify-start items-center md:w-[35vw]">
            <p className={` antialiased text-white text-2xl`}>My analysis</p>
            <div className="flex flex-col justify-center items-center font-extralight text-sm">
              <div className="flex flex-col py-3 text-white">
                {userRequest && (
                  <p>
                    <span>
                      Analysis:{userRequest.enterprise}
                    </span>
                    <span className="text-white text-xs"> {userRequest.date}</span>
                  </p>
                )}
                {!userRequest && <p>You don't have any analysis yet</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="flex items-center justify-center py-6">
        <Image src={"/general/Wuau_Logo-white.png"} width={150} height={100} />
      </footer>
    </main>
  );
}
