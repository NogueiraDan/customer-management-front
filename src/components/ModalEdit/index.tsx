import { AiOutlineClose } from "react-icons/ai";
import style from "./ModalEdit.module.css";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface IModal {
  isOpen: boolean;
  handleChangeModal: () => void;
  hora: string;
  nome: string;
  id: string;
  data: any;
}

export function ModalEdit({
  isOpen,
  handleChangeModal,
  hora,
  nome,
  id,
  data,
}: IModal) {

  
  const [date, setDate] = useState<any>();
  const [horaSchedule, setHoraSchedule] = useState("");
  const [availableSchedules, setAvailableSchedules] = useState<any>();
  const token = localStorage.getItem("token:customer");
  const currentValue = new Date();
  const [currentData, setCurrentData] = useState<any>();

  const handleSetDate = (date: string) => {
    console.log("Data do calendario: "+date);
    setDate(date);
    const partes = date.split("-");
    const formatedData = `${partes[2]}${partes[1]}${partes[0]}`;
    console.log("Current Data para a requisição: "+formatedData);
    setCurrentData(formatedData)
  };

  useEffect(() => {
    console.log("Data Formatada para o envio da Requisição: " + currentData);
    axios
      .get(
        `http://localhost:3000/agendamentos/horarios-disponiveis/${currentData}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAvailableSchedules(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [date]);

  const handleChangehour = (hora: string) => {
    setHoraSchedule(hora);
  };

  const updateData = async () => {
    const dia = currentData.substring(0, 2);
    const mes = currentData.substring(2, 4);
    const ano = currentData.substring(4);
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const data = {
      data: dataFormatada,
      hora: horaSchedule ? horaSchedule : hora,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("Data: " + data.data);
    console.log("Hora: " + data.hora);

    axios
      .patch(`http://localhost:3000/agendamentos/${id}`, data, { headers })
      .then((res) => {
        console.log(res);
        toast.success(`Agendamento atualizado! Recarregue a página`);
        handleChangeModal();
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          toast.error(err.response?.data.message);
        }
      });
  };

  if (isOpen) {
    return (
      <div className={style.background}>
        <div className={style.modal}>
          <div className={style.header}>
            <h2>Editar Horário</h2>
            <AiOutlineClose size={25} onClick={handleChangeModal} />
          </div>
          <div className={style.body}>
            <p>
              {nome} - {hora}h
            </p>

            <div className={style.input}>
              <label htmlFor="">Indique uma nova data</label>
              <input
                type="date"
                onChange={(e) => handleSetDate(e.target.value)}
              />
            </div>

            <div className={style.input}>
              <label htmlFor="">Horários disponiveis</label>
              <select
                name=""
                id=""
                onChange={(e) => handleChangehour(e.target.value)}
              >
                {availableSchedules.map((hora, index) => {
                  return (
                    <option value={hora} key={index}>
                      {hora}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={style.footer}>
            <button onClick={handleChangeModal}>Cancelar</button>
            <button onClick={updateData}>Editar</button>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}