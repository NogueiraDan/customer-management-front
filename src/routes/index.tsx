import { Route, Routes } from 'react-router-dom';
import { Login } from '../page/Login';
import { Register } from '../page/Register';
import { Dashboard } from '../page/Dashboard';
import { Schedules } from '../page/Schedules';
import { PrivateRoute } from './PrivateRoute';
import { EditProfile } from '../page/EditProfile';
import { Customers } from '../page/Customers';

export const RouteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/schedules"
        element={
          <PrivateRoute>
            <Schedules />
          </PrivateRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
