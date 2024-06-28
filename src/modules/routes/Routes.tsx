import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./Protectedroute";
import { WorkspacesAndBoardsPage } from "../workspace/WorkspacesAndBoardsPage";
import { Board } from "../board/Board";
import App from "../../App";
import { Home } from "../home/Home";
import { Login } from "../auth/pages/Login";
import { Signup } from "../auth/pages/Signup";
import { WorkspacePage } from "../workspace/Workspace";
import { DndExample } from "../workspace/DND";
import { SortableTest } from "../workspace/SortableTest";
import { DndPageDemo } from "../dnd/Dnd";
import { SortablePage } from "../sortable/SortablePage";
import { HocExample } from "../hoc/Hoc";

export const AppRoutes = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "tableros",
          element: (
            <ProtectedRoute>
              <WorkspacesAndBoardsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "tablero/:id",
          element: (
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          ),
        },
        {
          path: "ws/:id",
          element: (
            <ProtectedRoute>
              <SortableTest />
            </ProtectedRoute>
          ),
        },
        {
          path: "dnd",
          element: (
            <ProtectedRoute>
              <DndPageDemo />
            </ProtectedRoute>
          ),
        },
        {
          path: "final",
          element: (
            <ProtectedRoute>
              <SortablePage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
};
