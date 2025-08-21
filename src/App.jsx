import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu from "./features/menu/Menu";
import { loader as menuLoader } from "./features/menu/MenuLoader";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import { action as createOrderAction } from "./features/order/CreateOrderAction";
import Order from "./features/order/Order";
import { loader as orderLoader } from "./features/order/OrderLoader";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProdectidRoute";
import { authLoader } from "./loaders/authLoader";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        loader: authLoader,
        children: [
          {
            path: "/menu",
            element: (
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            ),
            loader: menuLoader,
            errorElement: <Error />,
          },
          {
            path: "/cart",
            element: (
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            ),
          },
          {
            path: "/order/new",
            element: (
              <ProtectedRoute>
                <CreateOrder />
              </ProtectedRoute>
            ),
            action: createOrderAction,
          },
          {
            path: "/order/:orderId",
            // element: (
            //   <ProtectedRoute>
            //     <Order />
            //   </ProtectedRoute>
            // ),
            element: <Order />,
            loader: orderLoader,
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
