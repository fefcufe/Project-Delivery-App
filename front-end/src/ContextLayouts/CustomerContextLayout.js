import { Outlet } from 'react-router-dom';
import CustomerProvider from '../context/CustomerProvider';

export default function CustomerContextLayout() {
  return (
    <CustomerProvider>
      <Outlet />
    </CustomerProvider>
  );
}
