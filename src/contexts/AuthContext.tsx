import { ReactNode, createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContextData {
  signIn: ({ emailValue, senhaValue }: ISignIn) => void;
  signOut: () => void;
  user: IUserData;
  availableSchedules: Array<string>;
  isAuthenticated: boolean;
}

interface IUserData {
  nome: string;
  email: string;
  id: number
}
interface ISignIn {
  emailValue: string;
  senhaValue: string;
}
export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProvider) {
  const availableSchedules = [
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
  ];
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem('user:customer');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  });
  // Variavel de controle de usuário logado
  const isAuthenticated = !!user && Object.keys(user).length !== 0;
  const navigate = useNavigate();


  async function signIn({ emailValue, senhaValue }: ISignIn) {
   
    try {
      const  {data}  = await axios.post('https://customer-management-api-bdjh.onrender.com/auth/login', {
       email: emailValue,
       senha: senhaValue
      });
      const { access_token, email, nome, id } = data;

      const userData = {
        nome: nome,
        email:email,
        id: id
      };

      localStorage.setItem('token:customer', access_token);
      localStorage.setItem('user:customer', JSON.stringify(userData));

      navigate('/dashboard');
      toast.success(`Seja bem vindo(a), ${userData.nome}`);
      setUser(userData);
      return data;

    } catch{
      toast.error('Não conseguimos realizar o login. Tente mais tarde');
    }
  }
  function signOut() {
    localStorage.removeItem('token:customer');
    localStorage.removeItem('user:customer');
    navigate('/');
  }


  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        availableSchedules,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
