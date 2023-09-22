import style from "./Register.module.css";
import logo from "../../assets/logo.webp";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsPerson, BsKey } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const schema = yup.object().shape({
    name: yup.string().required("Campo de nome obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Campo de email obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 caracteres")
      .required("Campo de senha obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ resolver: yupResolver(schema) });

  const submit = handleSubmit((data) => {
    axios
      .post("http://localhost:3000/profissionais/", {
        nome: data.name,
        email: data.email,
        senha: data.password,
      })
      .then((result) => {
        console.log(result);
        alert("Profissional Cadastrado com Sucesso!");
      })
      .catch((err) => {
        alert("Ocorreu algum erro!"+err);
      });
  });
  return (
    <div className={style.background}>
      <div className="container">
        <p className={style.navigate}>
          <Link to={"/"}>Home</Link> {">"} Área de Cadastro
        </p>
        <div className={style.wrapper}>
          <div className={style.imageContainer}>
            <img src={logo} alt="" />
          </div>
          <div className={style.card}>
            <h2>Área de Cadastro</h2>
            <form onSubmit={submit}>
              <Input
                placeholder="Nome"
                type="text"
                {...register("name", { required: true })}
                error={errors.name && errors.name.message}
                icon={<BsPerson size={20} />}
              />
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
                {...register("password", { required: true })}
                error={errors.password && errors.password.message}
                icon={<BsKey size={20} />}
              />
              <Button text="Cadastrar" />
            </form>
            <div className={style.register}>
              <span>
                Já tem cadastro? <Link to={"/"}>Voltar à Página Inicial </Link>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
