import z from "zod"

//Signup Input
export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})


//SignIn Input
export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})


//Create Blog 
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})


//Update Blog 
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})

export type SigninInput = z.infer<typeof signinInput>
export type SignupInput = z.infer<typeof signupInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
