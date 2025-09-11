import LoginPageComponent from "@/src/components/pages/login.page"
import { currentUser } from "@/src/lib/auth/currentUser";

export const metadata = {
    title: "Ravenure - Giriş",
    description: "Ravenure Giriş",
}
export default async function LoginPage() {
    const user = await currentUser();
    return (
        <LoginPageComponent isLoggedIn={user !== null}/>
    )
}