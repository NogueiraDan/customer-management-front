import style from "./Card.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { getHours, isAfter } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalEdit } from "../ModalEdit";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface ISchedule {
  id: any;
  hora: string;
  data: string;
  nome: string;
  telefone: string;
}
export const Card = ({ id, hora, data, nome, telefone }: ISchedule) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleChangeModal = () => {
    setOpenModal(!openModal);
  };

  const handleDelete = (id:any) => {

    console.log("Id do agendamento: "+id)
    axios.delete(`https://customer-management-api-bdjh.onrender.com/agendamentos/${id}`)
    .then((res)=>{
      // toast.success(`Agendamento deletado com Sucesso!`);
      window.location.reload()
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    });
  };

  return (
    <>
      <div className={style.background}>
        <div className={style.scheduleWrapper}>
          <span className={style.hourWrapper}>{hora}h</span>
          <div>
            <p className={style.scheduleInfo}>{nome}</p>
            <p className={style.scheduleInfo}>{data}</p>
            <p className={style.scheduleInfo}>Telefone: {telefone}</p>
          </div>
        </div>

        <div className={style.icons}>
          <AiOutlineEdit
            color="#5F68B1"
            size={17}
            onClick={() => handleChangeModal()}
          />
          <RiDeleteBinLine
            color="#EB2E2E"
            size={17}
            onClick={() => handleDelete(id)}
          />
        </div>
      </div>
      <ModalEdit
        isOpen={openModal}
        handleChangeModal={handleChangeModal}
        hora={hora}
        id={id}
        nome={nome}
        data={data}
      />
    </>
  );
};
