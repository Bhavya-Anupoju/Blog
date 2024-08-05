import { Avatar } from "./BlogCard"
import { useEffect, useState } from 'react';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom"
 
interface CustomJwtPayload extends JwtPayload { 
    name: string;
}
 
export const Appbar = () => {
    const [userName, setUserName] = useState<string>('');
    const navigate = useNavigate();

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
    }, [userName]); 
    
    const handleSignOut = () => {
        localStorage.removeItem('token'); 
        navigate('/signin');}

    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-2xl font-bold text-orange-950">
            Brew
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <button 
                    onClick={handleSignOut} 
                    type="button" 
                    className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                    Sign Out
                </button>
            <Link to={`/profile`}>
            <Avatar size={"big"} name={userName} />
            </Link>
        </div>
    </div>
}
