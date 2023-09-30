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
import Payment from "./Payment/Payment"
import MyClass from "./Dashboard/userDashboard/MyClass"
import Addcourse from "./Dashboard/instructorDashboard/AddCourse"
import MyCourse from "./Dashboard/instructorDashboard/MyCourse"
import UpdateCourse from "./Dashboard/instructorDashboard/UpdateCourse"
import Search from "./search/Search"

 

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
        },
        {
          path: '/search',
          element: <Search/>
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
        },
        {
          path: 'myclass',
          element:<MyClass/>
        },
        {
          path: 'addcourse',
          element : <Addcourse/>
        },
        {
          path: 'mycourse',
          element : <MyCourse/>
        },
        {
          path: 'updatecourse/:id',
          element: <UpdateCourse />,
          loader: ({ params }) => fetch(`http://localhost:5000/data/${params.id}`)
        }
      ]
    },
    {
      path: '/payment',
      element:<Payment/>
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
