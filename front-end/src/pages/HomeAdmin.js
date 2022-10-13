import NavBar from '../components/NavBar';
import RegisterAdmin from '../components/RegisterAdmin';
import UsersList from '../components/UsersList';

export default function HomeAdmin() {
  return (
    <div>
      <NavBar />
      <RegisterAdmin />
      <UsersList />
    </div>
  );
}
