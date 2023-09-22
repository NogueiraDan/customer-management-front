import style from "./Login.module.css";
import logo from "../../assets/logo.webp";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { useAuth } from "../../hooks/auth";

interface IFormValues {
  email: string;
  senha: string;
}

export function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Campo de email obrigatório"),
    password: yup.string().required("Campo de senha obrigatório"),
  });
  const {
    register,
    // handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const submit = () => {
    const emailValue = getValues("email");
    const senhaValue = getValues("senha");
    try {
      signIn({ emailValue, senhaValue });
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:45 ~ submit ~ error:", error);
    }
  };


  return (
    <div className={style.background}>
      <div className={`container ${style.container}`}>
        <div className={style.wrapper}>
          <div>
            <img src={logo} alt="" />
          </div>
          <div className={style.card}>
            <h2>Olá, seja bem vindo</h2>

            <form>
              <Input
                placeholder="Email"
                type="text"
                {...register("email", { required: true })}
                error={errors.email && errors.email.message}
                icon={<AiOutlineMail size={20} />}
              />
              <Input
                placeholder="Senha"
                type="password"
                {...register("senha", { required: true })}
                error={errors.senha && errors.senha.message}
                icon={<BsKey size={20} />}
              />
            </form>

            <button className={style.buttonLogin} onClick={submit}>
              <span>Entrar</span>
            </button>

            <div className={style.register}>
              <span>
                Ainda não tem conta? <Link to={"/register"}>Cadastre-se</Link>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
