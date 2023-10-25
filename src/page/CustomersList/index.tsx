import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import axios, { isAxiosError } from "axios";
import style from "./customerslist.module.css";

export function CustomersList() {
  const [profissionalCustomers, setProfissionalCustomers] = useState<any>([]);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user:customer"));
    let userToken = localStorage.getItem("token:customer");

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get(`http://localhost:3000/profissionais/${user.id}/clientes`, {
        headers,
      })
      .then((res) => {
        console.log(res.data);
        setProfissionalCustomers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className={style.container}>
        <Header />
        <h1 className={style.title}>Sua carteira de Clientes</h1>
        <div>
          {profissionalCustomers.map((customer: any) => (
            <div className={style.customerWrapper}>
              <h3>Nome: {customer.nome}</h3>
              <p><strong>Idade:</strong>{customer.idade}</p>
              <p><strong>Endereço:</strong> {customer.endereco}</p>
              <p><strong>Telefone para contato:</strong> {customer.telefone}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomersList;
