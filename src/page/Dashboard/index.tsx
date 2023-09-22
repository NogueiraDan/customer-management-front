import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import style from "./Dashboard.module.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { format, isToday } from "date-fns";
import axios from "axios";

export function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [scheduleDate, setScheduleDate] = useState<any>();
  const [schedules, setSchedules] = useState<Array<any>>([]);
  const { user } = useAuth();

  
  // Requisição dos demais agendamentos
  useEffect(() => {
    const token = localStorage.getItem("token:customer");
    axios
      .get(
        `http://localhost:3000/profissionais/1/agendamentos-hoje?data=${scheduleDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data)
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [scheduleDate]);

  // Primeira request de Agendamentos do Dia de Hoje
  useEffect(() => {
    const token = localStorage.getItem("token:customer");
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    axios
      .get(
        `http://localhost:3000/profissionais/1/agendamentos-hoje?data=${dataFormatada}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDataChange = (date: Date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    setScheduleDate(dataFormatada);
    console.log("Date: " + date);
    console.log("scheduleDate in Dashboard.tsx: " + dataFormatada);
  };

  return (
    <div className="container">
      <Header />
      <div className={style.dataTitle}>
        <h2>Bem vindo(a), {user.nome} </h2>
        <p>
          Esta é sua lista de horários{" "}
          {isToday(date) && (
            <span>
              <strong>de hoje,</strong>
            </span>
          )}
          dia <strong>{format(date, "dd/MM/yyy")}</strong>
        </p>
      </div>
      <h2 className={style.nextSchedules}>Agendamentos do Dia</h2>
      <div className={style.schedule}>
        <div className={style.cardWrapper}>
          {schedules && (
            <>
              {schedules.map((schedule, index) => {
                return (
                  <Card
                    key={index}
                    id={schedule.id}
                    hora={schedule.hora}
                    data={schedule.data}
                    nome={schedule.cliente.nome}
                    telefone={schedule.cliente.telefone}
                  
                  />
                );
              })}
            </>
          )}
          {schedules.length <= 0 && (
            <>
              <h3 className={style.emptySchedule}>
                Você não tem agendamentos para este dia!
              </h3>
            </>
          )}
        </div>
        <div className={style.picker}>
          <DayPicker
            className={style.calendar}
            classNames={{
              day: style.day,
            }}
            selected={date}
            mode="single"
            modifiersClassNames={{
              selected: style.selected,
            }}
            fromMonth={new Date()}
            locale={ptBR}
            onDayClick={handleDataChange}
          />
        </div>
      </div>
    </div>
  );
}
