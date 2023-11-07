import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import axios from "axios";
import style from "./customerslist.module.css";
import {fetchHeaders} from "../../utils/";
import { useAuth } from "../../hooks/auth";

export function CustomersList() {
  const [profissionalCustomers, setProfissionalCustomers] = useState<any>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    axios
      .get(
        `https://customer-management-api-bdjh.onrender.com/profissionais/${user.id}/clientes`,
        {
          headers: fetchHeaders(),
        }
      )
      .then((res) => {
        console.log(res.data);
        setProfissionalCustomers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Header />
      <div className={style.container}>
        <h1 className={style.title}>Sua carteira de Clientes</h1>
        <div>
          {profissionalCustomers.map((customer: any) => (
            <div className={style.customerWrapper}>
              <h3>Nome: {customer.nome}</h3>
              <p>
                <strong>Idade:</strong>
                {customer.idade}
              </p>
              <p>
                <strong>Endereço:</strong> {customer.endereco}
              </p>
              <p>
                <strong>Telefone para contato:</strong> {customer.telefone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomersList;
