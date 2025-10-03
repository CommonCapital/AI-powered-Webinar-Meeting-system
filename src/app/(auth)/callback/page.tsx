import { onAuthenticateUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

const AuthCallbackPage = async () => {
    const auth = await onAuthenticateUser()
    if (auth.status ===200 || auth.status === 201) {
        redirect('/home')
    } else if (auth.status === 403 || auth.status === 500 || auth.status === 400) {
        redirect('/')
    }
return (
    <div>

    </div>
)
}
export default AuthCallbackPage