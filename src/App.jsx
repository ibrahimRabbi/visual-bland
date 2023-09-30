import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./Home/Home"
import SingleCourse from "./SingleCourse/SingleCourse"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import AuthContext from "./Authentication/AuthContext"
import SignUp from "./Form/Signup"
import Signin from "./Form/Signin"
import PrivetRoute from "./privetRoute/PrivetRoute"
import Dashboard from "./Dashboard/Dashboard"
import SaveCourse from "./Dashboard/userDashboard/SaveCourse"

 

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element:<Home/>
        },
        {
          path: ':id',
          element: <PrivetRoute><SingleCourse/></PrivetRoute>,
          loader: ({ params }) => fetch(`http://localhost:5000/data/${params.id}`)
        }
      ]
    },
    {
      path: '/signup',
      element: <SignUp/>
    },
    {
      path: '/signin',
      element:<Signin/>
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: 'savecourse',
          element : <SaveCourse/>
        }
      ]
    }
  ])

  return (
    <Provider store={store}>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
     </Provider>
  )
}

export default App
