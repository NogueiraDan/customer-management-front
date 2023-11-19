import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import {
  AiOutlineUser,
  AiFillCalendar,
  AiFillPhone,
  AiFillPushpin,
} from "react-icons/ai";
import style from "./Customers.module.css";
import { toast } from "react-toastify";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchHeaders } from "../../utils/";
import { useAuth } from "../../hooks/auth";

interface IFormValues {
  nome: string;
  idade: string;
  telefone: string;
  endereco: string;
}
export function Customers() {
  const { user } = useAuth();

  const navigate = useNavigate();
  const schema = yup.object().shape({
    nome: yup.string().required("Campo de Nome obrigatório"),
    idade: yup.string().required("Campo de telefone obrigatório"),
    telefone: yup.string().required("Campo de data obrigatório"),
    endereco: yup.string().required("Campo de data obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = handleSubmit(async ({ nome, idade, telefone, endereco }) => {
    const data = {
      nome: nome,
      idade: parseInt(idade),
      telefone: telefone,
      endereco: endereco,
      profissional: user.id,
    };

    axios
      .post(
        "https://customer-management-api-bdjh.onrender.com/clientes/",
        data,
        {
          headers: fetchHeaders(),
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(`Cliente cadastrado com sucesso!`);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
          console.log(error);
        }
      });
  });

  return (
    <div className={`${style.container} container`}>
      <Header />
      <h2>
        <strong>Cadastro de Cliente</strong>
      </h2>

      <div className={style.formDiv}>
        <form onSubmit={submit}>
          <Input
            placeholder="Nome do cliente"
            type="text"
            {...register("nome", { required: true })}
            error={errors.nome && errors.nome.message}
            icon={<AiOutlineUser size={20} />}
          />

          <Input
            placeholder="Idade do Cliente"
            type="number"
            {...register("idade", { required: true })}
            error={errors.idade && errors.idade.message}
            icon={<AiFillCalendar size={20} />}
          />

          <Input
            placeholder="Contato do Cliente"
            type="text"
            {...register("telefone", { required: true })}
            error={errors.telefone && errors.telefone.message}
            icon={<AiFillPhone size={20} />}
          />

          <Input
            placeholder="Endereço do Cliente"
            type="text"
            {...register("endereco", { required: true })}
            error={errors.endereco && errors.endereco.message}
            icon={<AiFillPushpin size={20} />}
          />

          <div className={style.footer}>
            <button className={style.buttonSubmit}>Salvar</button>
          </div>
        </form>
        {/* <button>Cancelar</button> */}
      </div>
    </div>
  );
}
