import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"


export default function AuthLayout() {
  return (
    <>
        <div className="bg-gray-900 min-h-screen">
            <div className="py-5 lg:py-10 mx-auto w-[400px]">
                <Link to={'/auth/login'}>
                    <Logo />
                </Link>
                <div className="mt-10">
                    <Outlet />
                </div>
            </div>            
        </div>
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
