import { ReactNode, createContext, useEffect, useState } from 'react';
import axios, { isAxiosError } from 'axios';
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
  schedules: Array<ISchedule>;
  date: string;
  handleSetDate: (date: string) => void;
  isAuthenticated: boolean;
}

interface ISchedule {
  name: string;
  phone: string;
  date: Date;
  id: string;
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

  const [schedules, setSchedules] = useState<Array<ISchedule>>([]);
  const [date, setDate] = useState('');
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
  const handleSetDate = (date: string) => {
    setDate(date);
  };

  // useEffect(() => {
  //   api
  //     .get('/schedules', {
  //       params: {
  //         date,
  //       },
  //     })
  //     .then((response) => {
  //       setSchedules(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, [date]);

  async function signIn({ emailValue, senhaValue }: ISignIn) {
   
    try {
      const  {data}  = await axios.post('http://localhost:3000/auth/login', {
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

    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        console.log(error)
      } else {
        toast.error('Não conseguimos realizar o login. Tente mais tarde');
        console.log(error)
      }
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
        schedules,
        date,
        handleSetDate,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}