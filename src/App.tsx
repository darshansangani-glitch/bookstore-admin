import "./App.css";
import Login from "./pages/Login.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.js";
import AdminBooksPage from "./pages/Books.js";
import AdminHomePage from "./pages/Home.js";
import AdminPurchasePage from "./pages/purchase.js";
import AdminBookRequestPage from "./pages/BookRequestPage.js";
import BookIssuedPage from "./pages/BookIssuedPage.js";
import { UserPage } from "./pages/User.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/books",
          element: <AdminBooksPage />,
        },
        {
          path: "/admin-home",
          element: <AdminHomePage />,
        },
        {
          path: "/purchase",
          element: <AdminPurchasePage />,
        },
        {
          path: "/book-requests",
          element: <AdminBookRequestPage />,
        },
        {
          path: "/book-issue",
          element: <BookIssuedPage />,
        },
        {
          path:'/user',
          element:<UserPage />
        }
      ],
    },
    
  ]);
  // <Router>
  //   <Routes>
  //     <Route path="/" element={<Login />} />
  //     <Route path="/books" element={<AdminBooksPage />} />
  //     <Route path="/admin-home" element={<AdminHomePage />} />
  //     <Route path="/purchase" element={<AdminPurchasePage />} />
  //     <Route path="/book-requests" element={<AdminBookRequestPage />} />
  //     {/* <Route path="/book-issue" element={<BookIssuePage />} /> */}
  //   </Routes>
  // </Router>
  return <RouterProvider router={router} />;
}

export default App;
