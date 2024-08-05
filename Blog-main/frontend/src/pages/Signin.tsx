import { Auth } from "../components/Auth"
export const Signin = () => {
    return (
        <div className="grid grid-cols-1">
            <div>
                <Auth  type="signin" />
            </div>
        </div>
    )
}