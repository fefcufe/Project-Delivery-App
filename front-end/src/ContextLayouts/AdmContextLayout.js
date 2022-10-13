import { Outlet } from 'react-router-dom';
import AdmProvider from '../context/AdmProvider';

export default function AdmContextLayout() {
  return (
    <AdmProvider>
      <Outlet />
    </AdmProvider>
  );
}
