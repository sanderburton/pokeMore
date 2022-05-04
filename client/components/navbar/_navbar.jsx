import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { RolesContext } from '../../utils/roles_context';
import { AuthContext } from '../../utils/auth_context';
import { ApiContext } from '../../utils/api_context';

export const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const roles = useContext(RolesContext);
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  return (
    <div className="flex row navbar">
      <h1 className="logo">PokeMore</h1>
      <h1 className="navitem">Welcome {user.firstName}</h1>
      <button type="button" className="navbutton" onClick={logout}>
        Logout
      </button>
      {roles.includes('admin') && (
        <button type="button" className="navbutton" onClick={() => navigate('/admin')}>
          Admin
        </button>
      )}
      <button type="button" className="navbutton" onClick={() => navigate('/')}>
        Home
      </button>
    </div>
  );
};
