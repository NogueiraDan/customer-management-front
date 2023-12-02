import style from "./customerslist.module.css";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/";
import { Header } from "../../components/Header";
import { fetchHeaders } from "../../utils/";
import { useAuth } from "../../hooks/auth";
import { Customer } from "../../types";
import Loading from "../../components/Loading";

export function CustomersList() {
  const { user } = useAuth();

  const [profissionalCustomers, isLoading] = useFetch({
    url: `${BASE_URL}/profissionais/${user.id}/clientes`,
    method: "GET",
    headers: fetchHeaders(),
    dependencies: [user.id],
  });

  return (
    <>
      <Header />
      <div className={style.container}>
        <h1 className={style.title}>Sua carteira de Clientes</h1>
        <div>
          {isLoading && <Loading type="spinner" />}
          {profissionalCustomers.map((customer: Customer) => (
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
