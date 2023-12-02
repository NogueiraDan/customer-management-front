import { AiOutlineClose } from "react-icons/ai";
import style from "./ModalEdit.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios, { isAxiosError } from "axios";
import { fetchHeaders } from "../../utils";
import { BASE_URL } from "../../utils";
import useFetch from "../../hooks/useFetch";

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
}: IModal) {
  const [date, setDate] = useState<any>();
  const [horaSchedule, setHoraSchedule] = useState("");
  const [currentData, setCurrentData] = useState<any>();
  const [remarcacao, setRemarcacao] = useState<string | undefined>("");

  const handleSetDate = (date: string) => {
    console.log("Data do calendario: " + date);
    setDate(date);
    const partes = date.split("-");
    const formatedData = `${partes[2]}${partes[1]}${partes[0]}`;
    console.log("Current Data para a requisição: " + formatedData);
    setCurrentData(formatedData);
  };

  const [availableSchedules] = useFetch({
    url: `${BASE_URL}/agendamentos/horarios-disponiveis/${currentData}`,
    method: "GET",
    headers: fetchHeaders(),
    dependencies: [currentData, date],
  });

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
      tipo: remarcacao,
    };

    axios
      .patch(
        `https://customer-management-api-bdjh.onrender.com/agendamentos/${id}`,
        data,
        {
          headers: fetchHeaders(),
        }
      )
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
                {availableSchedules
                  ? availableSchedules.map((hora: any, index: any) => {
                      return (
                        <option value={hora} key={index}>
                          {hora}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>

            <div className={style.input}>
              <label htmlFor="">Marque o campo de remarcação</label>
              <input
                type="checkbox"
                id="remarcacao"
                name="remarcacao"
                value="remarcação"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRemarcacao(e.target.value)
                }
              />
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
