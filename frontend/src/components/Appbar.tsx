import { Avatar } from "./BlogCard"
import { useEffect, useState } from 'react';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import { Link } from "react-router-dom"
 
interface CustomJwtPayload extends JwtPayload { 
    name: string;
}
 
export const Appbar = () => {
    const [userName, setUserName] = useState<string>('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Retrieved token:", token);
        if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token);
            console.log("Retrieved token:", decodedToken);
            if (decodedToken && decodedToken.name) {
                setUserName(decodedToken.name)
                console.log(userName)
            }
        }
    }, []);   

    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                Brew
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <Avatar size={"big"} name={userName} />
        </div>
    </div>
}
