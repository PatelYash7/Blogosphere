import { ChangeEvent, useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import { SignupInput } from "@zuxxer/medium-common";
import { EyeSvg } from "../Resources/SVG";
import axios from "axios";
import { Backend_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  });

  async function sendRequest() {
      try {
          const response = await axios.post(`${Backend_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
          const jwt = response.data;
          
          localStorage.setItem("token", `Bearer ${jwt.token}`);
          navigate("/blogs");
      } catch(e) {
          alert("Error while signing up")
      }
  }

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="John Doe..."
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}
            <LabelledInput
              label="Email"
              placeholder="Johndoe@gmail.com"
              type="email"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="123456"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {

    const [view,Setview] = useState(type);
  return (
    <div>
      <label className="block pt-4 mb-2 text-sm font-semibold text-black">
        {label}
      </label>
      <div className="flex items-center gap-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50" >
        <input
          onChange={onChange}
          type={view}
          id="first_name"
          className="w-full bg-gray-50 focus:outline-none  p-1.5 rounded m-1"
          placeholder={placeholder}
          required
        />
        {type==="password"?
            <button
            className="m-1" 
            onClick={()=>{
                Setview("text");
                setTimeout(()=>{Setview("password")},1000)
            }}>
                <EyeSvg/>
            </button>
        :null}
      </div>
    </div>
  );
}
