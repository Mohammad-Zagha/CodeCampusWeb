import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import Login from "./pages/Login";
import TeacherHome from "./pages/TeacherHome";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Room from "./pages/Room";
import AdminHome from "./pages/AdminHome";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AddProduct from "./pages/AddProduct";
import ShowProductPage from "./pages/ShowProduct";
import LivePage from "./pages/LivePage";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route element={<AuthOutlet fallbackPath="/login" />}>
            <Route path="/" element={<AdminHome />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/LivePage" element={<LivePage />} />
            <Route path="/Products" element={<ShowProductPage />} />
            <Route path="/teacher-home" element={<TeacherHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
