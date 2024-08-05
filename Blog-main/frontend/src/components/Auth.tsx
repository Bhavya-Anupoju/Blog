import { SignupInput } from "@bhavya_anupoju/brew-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type: "signup" | "signin"}) => {

    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name:"",
        username: "",
        password:""
    }) 

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data;
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        } catch (e) {
            alert("Error while signing up")
        }
    }
    return(
        <div className="h-screen flex justify-center items-center">
            <div className="flex justify-center w-[350px]">
                <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold text-blue-700 mt-1 mb-4">
                        {type === "signup" ? "Create an account" : "Hi! Welcome back"}
                    </div>
                    <div className="text-blue-700 ml-2">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>{type === "signin" ? "Sign up" : "Sign in"}</Link>
                    </div>
                </div>
                
                <div className="pt-4">
                    {type === "signup" ? <LabelledInput label = "Name" placeholder="Bhavya Priya" onChange={(e) => {
                        setPostInputs({
                        ...postInputs, 
                        name: e.target.value
                        })
                    }}/> : null}
                    <LabelledInput label = "Username" placeholder="bhavya@gmail.com" onChange={(e) => {
                        setPostInputs({
                        ...postInputs, 
                        username: e.target.value
                        })
                    }} />
                    <LabelledInput label = "Password" type="password" placeholder="Account@222" onChange={(e) => {
                        setPostInputs({
                        ...postInputs, 
                        password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest} type="button" className="mt-8 text-white w-full bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>

                    <RequirementsCard />
                </div>
                </div>   
            </div>
        </div>
    )
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type}: LabelledInputType){
    return(
    <div>
        <label className="block mb-2 text-sm text-orange-950 font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>

    )
}

export const RequirementsCard = () => (
    <div className="mt-4 p-4 bg-white bg-opacity-50 border border-gray-300 rounded-lg shadow-lg">
        <ul className="text-sm text-gray-700 list-disc list-inside">
            <li>Email should be in a valid email format.</li>
            <li>Password should be at least 6 characters long.</li>
        </ul>
    </div>
);
