import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import AllPosts from "./pages/AllPosts";
import EditPost from "./pages/EditPost";
import { AuthLayout,Login,Signup} from './components/index.js'
import { RouterProvider } from "react-router-dom";


const router=createBrowserRouter([
  {
    path :'/',
    element :<App/>,
    childern :[
      {
        path :'/',
        element :<Home/>
      },
      {
        path :'/login',
        element :(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
            <AuthLayout authentication={false}>
                <Signup />
            </AuthLayout>
        ),
    },
    {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>
        ),
    },
    {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
    {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ],
  },
])

createRoot(document.getElementById('root')).render(
 
 <StrictMode>
    <Provider store={store}>
          <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
