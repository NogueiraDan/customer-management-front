import style from "./Schedules.module.css";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { InputSchedule } from "../../components/InputSchedule";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { fetchHeaders } from "../../utils/";

interface IFormValues {
  nome: string;
  data: string;
  hora: string;
}
export function Schedules() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState<any>();
  const [horaSchedule, setHoraSchedule] = useState("");
  const [profissionalCustomers, setProfissionalCustomers] = useState<any>([]);
  const [currentData, setCurrentData] = useState<any>();
  const [customerData, setCustomerData] = useState<any | undefined>();
  const [availableSchedules, setAvailableSchedules] = useState([
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ]);

  const schema = yup.object().shape({
    nome: yup.string().required("Campo de telefone obrigatório"),
    data: yup.string().required("Campo de Nome obrigatório"),
    hora: yup.string().required("Campo de data obrigatório"),
  });
  const {
    register,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  // Buscando os clientes do Profissional
  useEffect(() => {
    axios
      .get(
        `https://customer-management-api-bdjh.onrender.com/profissionais/${user.id}/clientes`,
        {
          headers: fetchHeaders(),
        }
      )
      .then((res) => {
        setProfissionalCustomers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Buscando horarios disponiveis quando a data muda
  useEffect(() => {
    axios
      .get(
        `https://customer-management-api-bdjh.onrender.com/agendamentos/horarios-disponiveis/${currentData}`,
        {
          headers: fetchHeaders(),
        }
      )
      .then((response) => {
        setAvailableSchedules(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [date]);

  // HANDLES
  const handleChangeDate = (date: string) => {
    console.log("Data Selecionada: " + date);
    setDate(date);
    const partes = date.split("-");
    const formatedData = `${partes[2]}${partes[1]}${partes[0]}`;
    setCurrentData(formatedData);
  };

  const handleChangehour = (hora: string) => {
    console.log("Hora selecionada: " + hora);
    setHoraSchedule(hora);
  };

  const handleCustomerChange = (selectedCustomer: any) => {
    const customer: any = JSON.parse(selectedCustomer);
    console.log("Cliente selecionado:", customer);
    setCustomerData(customer);
  };

  const submit = () => {
    const dia = currentData.substring(0, 2);
    const mes = currentData.substring(2, 4);
    const ano = currentData.substring(4);
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const data = {
      data: dataFormatada,
      hora: horaSchedule,
      profissional: user.id,
      cliente: customerData.id,
    };

    const headers = fetchHeaders();

    console.log("Headers", headers);
    console.log("Data", data);

    // axios.post("https://customer-management-api-bdjh.onrender.com/agendamentos/", data, {headers})
    // .then(()=>{
    //   toast.success(`Agendamento realizado com Sucesso!`);
    //   navigate('/dashboard');
    // })
    // .catch((err) => {
    //   if (isAxiosError(err)) {
    //     toast.error(err.response?.data.message);
    //   }
    //   else{
    //     toast.error("O servidor não está respondendo 🥺​");
    //   }
    // });
  };

  return (
    <div className={`${style.container} container`}>
      <Header />
      <h2>Agendamento de Horário</h2>
      <div className={style.formDiv}>
        <form>
          {/* DROPDOWN DE CLIENTES */}
          <div>
            <label htmlFor="">Cliente</label>
            <select
              className={style.selectCustomer}
              onChange={(e) => handleCustomerChange(e.target.value)}
            >
              {profissionalCustomers.map((customer: any, index: any) => {
                return (
                  <option value={JSON.stringify(customer)} key={index}>
                    {customer.nome}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={style.date}>
            <InputSchedule
              placeholder="Dia"
              type="date"
              {...register("data", {
                required: true,
                onChange: (e) => handleChangeDate(e.target.value),
              })}
              error={errors.data && errors.data.message}
            />
            <div className={style.select}>
              <label htmlFor="">Hora</label>
              <select
                {...register("hora", {
                  required: true,
                })}
                onChange={(e) => handleChangehour(e.target.value)}
              >
                {availableSchedules.map((hour, index) => {
                  return (
                    <option value={hour} key={index}>
                      {hour}
                    </option>
                  );
                })}
              </select>
              {errors.hora && <span>{errors.hora.message}</span>}
            </div>
          </div>
        </form>
        <div className={style.footer}>
          <button className={style.buttonSubmit} onClick={submit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
