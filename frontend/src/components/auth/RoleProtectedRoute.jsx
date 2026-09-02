// Auth removed — renders children directly regardless of role.
import { Outlet } from 'react-router-dom';
export const RoleProtectedRoute = () => <Outlet />;
