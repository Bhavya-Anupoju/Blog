import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-12 px-4 md:px-10 w-full pt-12 max-w-screen-xl">
                <div className="md:col-span-8 mb-8 md:mb-0">
                    <div className="text-3xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="pt-4 text-lg leading-relaxed">
                        {blog.content}
                    </div>
                </div>
                <div className="md:col-span-4 flex flex-col items-center md:items-start">
                    
                    <div className="flex items-center w-full ml-16">
                        <div className="pr-4">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}