import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectRoute(){
    const isAuth = useAuth()

    return isAuth.isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}