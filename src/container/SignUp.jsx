import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Signin = ({signin, setSignin}) => {
  const navigate = useNavigate();

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[check1, setCheck1] = useState(false)
  const[check2, setCheck2] = useState(false)

  const submitInputs = (e) => {
     e.preventDefault();

     if (email.trim() !== '' && password.trim() !== ''){
      if (password.length < 6) {
        toast.warning("Password must be at least 6 characters")
        return
      }
      if (check1 && check2) {

        //Api post request
        axios.post("http://localhost:3000/owners/SignUp", {
          email:email,
          password:password
        })
        .then((res) => {
          console.log(res.data)
          toast.success("Sign in successful")
          navigate('/')
          setSignin(false)
        }).catch((err) => {
          console.log(err)
          toast.error("Sign Up failed")
        })
        
      } else {
       toast.warning("Please check the checkboxes")
      }
     } else {
       toast.warning("Please fill the details")
      }

    
  }

  return (
    <div className="absolute top-36 right-0 left-0 m-auto z-20 bg-[#FFFFFF] shadowCard w-[310px] sm:w-[468px] md:w-[568px] rounded px-8 py-6 flex flex-col  gap-6 scaleUp">
      <header className="flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <h1 className="text-[#6E7491] text-[20px] sm:text-[24px] leading-5 sm:leading-8 font-bold ">
            Sign up for Tripma
          </h1>
          <MdOutlineClose
            className="text-[#6E7491] cursor-pointer"
            onClick={() => setSignin(!signin)}
          />
        </div>
        <p className=" text-sm sm:text-[18px] leading-4 sm:leading-6 text-[#7C8DB0] mt-2">
          Tripma is totally free to use. Sign up using your email address or
          phone number below to get started.
        </p>
      </header>
      <form onSubmit={submitInputs}  className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email or Phone Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border-[1px] border-[#A1B0CC] p-2 placeholder:text-[#7C8DB0] text-[#7C8DB0] rounded"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none border-[1px] border-[#A1B0CC] p-2 placeholder:text-[#7C8DB0] text-[#7C8DB0] rounded"
        />
        <button
          className="w-full bg-[#605DEC] text-[#FAFAFA] rounded py-3 outline-none border-none"
          onClick={submitInputs}
          >
          Create Account
        </button>
      </form>
      <div className="flex flex-col gap-2">
        <form className="flex items-center gap-2 ">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={check1}
            onChange={(e) => setCheck1(e.target.checked)}
            className="text-[#7C8DB0] outline-none"
          />
          <label htmlFor="checkbox" className="text-[#7C8DB0] text-sm sm:text-base">
            I agree to the{" "}
            <span className="text-[#605DEC]">terms and conditions</span>
          </label>
        </form>
        <form className="flex items-center gap-2 ">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={check2}
            onChange={(e) => setCheck2(e.target.checked)}
            className="text-[#7C8DB0] outline-none "
          />
          <label htmlFor="checkbox" className="text-[#7C8DB0] text-sm sm:text-base">
            Send me the latest deal alerts
          </label>
        </form>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1 " />
        <p className="text-[#7C8DB0] text-[18px] leading-6">or</p>
        <div className="w-full text-[#A1B0CC] border-t-[1px] border-t-[#A1B0CC] h-1" />
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          className="w-full flex gap-2 items-center justify-center border-[1px] border-[#605DEC] rounded p-3"
          onClick={() => setSignin(false)}
        >
          <FcGoogle className="w-[18px] h-[18px]" />
          <p className="text-[#605CDE] text-[16px] leading-6">
            Continue with Google
          </p>
        </button>
      </div>
    </div>
  );
};

export default Signin;
