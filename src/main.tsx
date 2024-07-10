import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/styles.css";
import { AppRoutes } from "./modules/routes/Routes.tsx";
import { AuthProvider } from "./modules/auth/useAuth.tsx";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = AppRoutes();
const queryClient = new QueryClient();

const Loading = () => <div>Loading...</div>;
const Error = () => <div>Error loading routes</div>;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MantineProvider defaultColorScheme="dark">
          <React.Suspense fallback={<Loading />}>
            <RouterProvider router={router} fallbackElement={<Error />} />
          </React.Suspense>
        </MantineProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
