import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Blog } from "../hooks";

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    isMine?: boolean;
    onDelete?: (id: number) => void;
    onUpdate?: (updatedBlog: Blog) => void;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    isMine,
    onDelete,
    onUpdate
}: BlogCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedContent, setUpdatedContent] = useState(content);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            await axios.put(`${BACKEND_URL}/api/v1/blog`, {
                id,
                title: updatedTitle,
                content: updatedContent
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setIsEditing(false);
            if (onUpdate){
                onUpdate({ id, title: updatedTitle, content: updatedContent, author: { name: authorName } });
            } 
        } catch (error) {
            console.error("Failed to update the post:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (isDeleting) return;
        if (window.confirm("Are you sure you want to delete this post?")) {
            setIsDeleting(true);
            try {
                const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                console.log("Delete response:", response);
                if (onDelete) onDelete(id);
            } catch (error) {
                console.error("Failed to delete the post:", error);
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.response?.data);
            }}
            finally {
                 setIsDeleting(false);
            }
        }
    };

    return (
        <div className="block w-[90%] mx-auto my-2 p-6 bg-white text-black hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg shadow-sm border-2">
            {isEditing ? (
                <div>
                    <label className="p-2 text-xl text-orange-900 font-semibold">
                        Title :{" "}
                    </label>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                        className="text-xl font-bold mb-2 w-full border-b border-gray-300 px-4 py-2"
                    />
                    <label className="p-2 text-xl text-orange-900 font-semibold">
                        Content :{" "}
                    </label>
                    <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                        className="text-base mb-4 w-full border-b border-gray-300 px-4 py-2"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className="px-4 py-2 bg-orange-900 text-white rounded-lg hover:bg-orange-950 transition duration-300 ease-in-out"
                        >
                            {isUpdating ? "Updating..." : "Update"}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <Link to={`/blog/${id}`} className="block w-full">
                        {!isMine && (
                            <div className="flex items-center mb-2">
                                <Avatar name={authorName} size="small" />
                                <p className="text-blue-500 font-semibold pl-2">{authorName}</p>
                            </div>
                        )}
                        <p className="text-xl font-bold mb-2">{title}</p>
                        <p className="text-md font-thin">{content.slice(0, 100) + "..."}</p>
                    </Link>
                    {isMine && (
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-orange-900 text-white rounded-lg hover:bg-orange-950 transition duration-300 ease-in-out flex items-center gap-1"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300 ease-in-out flex items-center gap-1"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Avatar Component
export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-orange-950 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-white`}>
                {name[0]}
            </span>
        </div>
    );
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">
    </div>
}
