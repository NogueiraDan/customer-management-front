import { Route, Routes  } from 'react-router-dom';
import { Login } from '../page/Login';
import { Register } from '../page/Register';
import { Dashboard } from '../page/Dashboard';
import { Schedules } from '../page/Schedules';
import { PrivateRoute } from './PrivateRoute';
import { Customers } from '../page/Customers';
import {CustomersList} from "../page/CustomersList";

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
        path="/list-customers"
        element={
          <PrivateRoute>
            <CustomersList />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
