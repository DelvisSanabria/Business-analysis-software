"use client";
import Image from "next/image";
import NavBar from "./components/NavBar";
import { pacifico, antonio } from "./ui/fonts";
import { useTheme } from "./ThemeContext";
import { SessionContext } from "../Context/Session";
import { useContext } from "react";

export default function Home() {
  const { theme } = useTheme();
  const {userSession} = useContext(SessionContext)
  console.log(userSession)
  return (
    <>
      <main
        className={`flex min-h-[80vh] ${
          theme == "light"
            ? "bg-[url('/general/Background-red.png')]"
            : "bg-[url('/general/Background-red-dark.png')]"
        } bg-cover flex-col items-center justify-between`}
      >
        <NavBar styles={"w-full"} />
        <div
          className="grid grid-cols-1 lg:grid-cols-2 lg:gap-32 gap-16
       justify-items-center w-full h-full px-8 lg:px-16"
        >
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full gap-0 md:gap-4 text-white">
            <h3 className={`${pacifico.className} antialiased hs3`}>Smart</h3>
            <h1
              className={`${antonio.className} antialiased yellow h1 font-bold`}
            >
              Marketing solutions
            </h1>
            <p className="text-white p font-light">
              Software Tailored to Meet Any Marketing Need.
            </p>
            <div className="dark py-4 text-[18px]">
              <input
                type="email"
                placeholder="Email"
                className="rounded-l-[25px] pl-4 py-1"
              />
              <button className="bg-yellow py-1 px-2 rounded-r-[25px] font-medium ">
                Sign-up
              </button>
            </div>
          </div>
          <div className="flex justify-center items-end h-full">
            <Image src="/general/girl-red.png" width={400} height={100} />
          </div>
        </div>
      </main>
      <section className="flex flex-col gap-4 justify-between items-center pt-4 min-h-[80vh]">
        <h2 className={`${antonio.className} yellow h2`}>
          Need a marketing plan?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-14 space-y-reverse h-full">
          <div className="order-2 lg:order-1 flex justify-center items-end h-full">
            <Image src="/general/guy-happy.png" width={400} height={100} />
          </div>
          <div className="flex order-1 lg:order-2 flex-col gap-4 text-white justify-center text-center lg:text-left">
            <h3 className={`${pacifico.className} antialiased hs3`}>
              We've got you covered!
            </h3>
            <p>
              We have developed a software that will help you determine your
              perfect customer, the market you should target, content
              strategies, and much more!
            </p>
          </div>
        </div>
      </section>
      <section
        className={`flex flex-col bg-cover items-center text-center gap-8 py-8 text-white min-h-[80vh] ${
          theme == "light"
            ? "bg-[url('/general/Background-yellow.png')]"
            : "bg-[url('/general/Background-black.png')]"
        }`}
      >
        <h3
          className={`${antonio.className} antialiased h2 font-bold ${
            theme == "light" ? "dark" : "yellow"
          }`}
        >
          Our plans
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-16 place-items-center h-full">
          <div className="flex flex-col min-h-[600px] justify-between text-left gap-2 bg-dark px-6 py-8 rounded-[25px]">
            <div>
              <h3 className={`text-center ${antonio.className} h3`}>Basic</h3>
              <p>You will receive:</p>
              <ul className="list-disc px-8">
                <li>Buyer persona analysis</li>
                <li>Market research insights</li>
                <li>Trends identification</li>
                <li>Recommended social media platforms</li>
                <li>Content strategy development</li>
                <li>Project's requirements specification</li>
              </ul>
            </div>
            <div className="h-full flex flex-col justify-end align-middle text-center gap-1">
              <p className="p">Total</p>
              <p className="text-[30px] font-semibold">FREE</p>
              <button className="bg-yellow font-bold rounded-[25px] dark py-2">
                Pay Now
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between text-left min-h-[700px] gap-2 bg-dark px-6 py-8 rounded-[25px]">
            <div>
              <h3 className={`text-center ${antonio.className} h3`}>
                Business
              </h3>
              <p>You will receive:</p>
              <ul className="list-disc px-8">
                <li>Buyer persona analysis</li>
                <li>Market research insights</li>
                <li>Trends identification</li>
                <li>Recommended social media platforms</li>
                <li>Content strategy development</li>
                <li>Competitor analysis</li>
                <li>Audience analysis</li>
                <li>Personalized PDF for your company</li>
              </ul>
              <button className="yellow">See more</button>
            </div>
            <div className="h-full flex flex-col justify-end align-middle text-center gap-1">
              <p className="p">Total</p>
              <p className="text-[30px] font-semibold">$25 USD</p>
              <button className="bg-yellow font-bold rounded-[25px] dark py-2">
                Pay Now
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between text-left min-h-[600px] gap-2 bg-dark px-6 py-8 rounded-[25px]">
            <div>
              <h3 className={`text-center ${antonio.className} h3`}>
                Entrepreneur
              </h3>
              <p>You will receive</p>
              <ul className="list-disc px-8">
                <li>Buyer persona analysis</li>
                <li>Market research insights</li>
                <li>Trends identification</li>
                <li>Recommended social media platforms</li>
                <li>Content strategy development</li>
                <li>Competitor analysis</li>
                <li>Audience analysis</li>
                <li>Advantages over competidors</li>
              </ul>
              <button className="yellow">See more</button>
            </div>
            <div className="h-full flex flex-col justify-end align-middle text-center gap-1">
              <p className="p">Total</p>
              <p className="text-[30px] font-semibold">$25 USD</p>
              <button className="bg-yellow font-bold rounded-[25px] dark py-2">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-8 items-center px-8 py-4 text-white">
        <div className="flex flex-col justify-center text-center md:text-left md:items-start items-center">
          <p className="font-bold p">Interested in trying future software?</p>
          <p className="font-light m">Sign up for free today!</p>
        </div>
        <div className="text-[18px] flex justify-center md:justify-end text-center items-center">
          <input
            type="email"
            placeholder="Email"
            className="rounded-l-[25px] pl-4 py-1"
          />
          <button className="bg-yellow py-1 px-2 dark rounded-r-[25px] font-medium ">
            Sign-up
          </button>
        </div>
      </section>
      <section
        className={`flex flex-col bg-cover items-center text-center gap-8 pt-8 px-16 text-white min-h-[80vh] ${
          theme == "light"
            ? "bg-[url('/general/Background-red.png')]"
            : "bg-[url('/general/Background-red-dark.png')]"
        }`}
      >
        <h3 className={`${antonio.className} yellow h3`}>
          Do you have any special requirement?
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full rounded-[25px] py-8">
          <div className="hidden lg:flex justify-center order-2 md:order-1">
            <Image src="/general/girl-yellow.png" width={300} height={100} />
          </div>
          <div className="flex flex-col justify-center items-center h-full gap-8 order-1 md:order-2">
            <p className={`${antonio.className} text-3xl font-semibold`}>
              Contact us
            </p>
            <div className="flex flex-col md:flex-row gap-8">
              <input
                type="text"
                placeholder="First name"
                className="rounded-[10px] pl-4 py-1"
              />
              <input
                type="text"
                placeholder="Last name"
                className="rounded-[10px] pl-4 py-1"
              />
            </div>
            <input
              type="text"
              placeholder="Email"
              className="rounded-[10px] md:min-w-[460px] pl-4 py-1"
            />
            <textarea
              placeholder="Message"
              className="rounded-[10px] pl-4 py-1 md:min-w-[460px]"
            ></textarea>
            <button className="bg-yellow py-1 px-8 rounded-[10px] dark font-semibold">
              Send
            </button>
          </div>
        </div>
      </section>
      <footer className="flex items-center justify-center py-6">
        <Image src={"/general/Wuau_Logo-white.png"} width={150} height={100} />
      </footer>
    </>
  );
}
