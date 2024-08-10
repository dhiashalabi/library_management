import { useFrappeAuth } from 'frappe-react-sdk'
import { Link, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

    const { currentUser } = useFrappeAuth()

    if (currentUser) {
        return (
            <Outlet />
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
                <p className="mb-4 text-lg font-semibold">Not Logged In</p>
                <Link
                    to="/login"
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Login
                </Link>
            </div>
        );

    }

}

export default ProtectedRoute
