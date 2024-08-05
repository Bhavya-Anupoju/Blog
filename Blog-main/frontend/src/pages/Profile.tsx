import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { BlogCard } from "../components/BlogCard";
import { Avatar } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Appbar } from "../components/Appbar";
interface CustomJwtPayload {
    name: string;
    id: string;
}

export const Profile = () => {
    const [user, setUser] = useState<CustomJwtPayload | null>(null);
    const { loading, blogs, refetchBlogs } = useBlogs();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token);
            setUser(decodedToken);
        }
    }, []);

    const handleDelete = useCallback(() => {
        refetchBlogs()
    }, [refetchBlogs]);


    const handleUpdate = useCallback(() => {
        refetchBlogs(); 
    }, [refetchBlogs]);

    const userPosts = blogs.filter(blog => blog.author.name === user?.name);

    return (
        <div>
            <Appbar />
        <div className="min-h-screen min-w-screen bg-gray-100 flex flex-col items-center p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full">
                <div className="flex flex-col items-center mb-6">
                    <Avatar name={user?.name ?? ""} size="big" />
                    <h1 className="text-2xl font-bold mt-4">{user?.name}</h1>
                    <h2 className="text-xl font-bold text-center">Your Posts</h2>
                </div>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {userPosts.length === 0 ? (
                            <div className="text-center text-gray-500">No posts available</div>
                        ) : (
                            userPosts.map((post) => (
                                <BlogCard
                                    key={post.id}
                                    id={post.id}
                                    authorName={post.author.name}
                                    isMine={true}
                                    title={post.title}
                                    content={post.content}
                                    onUpdate={handleUpdate}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default Profile;
