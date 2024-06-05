import { BlogCard } from "../components/BlogCard"

export const Blogs = () => {
    return(
        <div>
            <BlogCard authorName={"Bhavya"}
            title={"title of the blog"}
            content={"content of the blog"}
            publishedDate={"2nd June 2024"}/>
        </div>
    )
}