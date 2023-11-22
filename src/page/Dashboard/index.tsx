import "react-day-picker/dist/style.css";
import style from "./Dashboard.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { formatDate, fetchHeaders, BASE_URL } from "../../utils/";

export function Dashboard() {
  const date = new Date();
  const { user } = useAuth();
  const dataFormatada = formatDate(date);
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleDate, setScheduleDate] = useState<any>(dataFormatada);
  const [schedules, setSchedules] = useState<Array<any>>([]);

  // Primeira request de Agendamentos do Dia de Hoje
  useEffect(() => {
    console.log(`Data Formatada para primeira request: ${dataFormatada}`);
    axios
      .get(
        `${BASE_URL}/profissionais/${user.id}/agendamentos-hoje?data=${dataFormatada}`,
        {
          headers: fetchHeaders(),
        }
      )
      .then((response) => {
        setSchedules(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Requisição dos demais agendamentos
  useEffect(() => {
    console.log(
      `schedule Date da requisição dos demais agendamentos: ${scheduleDate}`
    );
    axios
      .get(
        `${BASE_URL}/profissionais/${user.id}/agendamentos-hoje?data=${scheduleDate}`,
        {
          headers: fetchHeaders(),
        }
      )
      .then((response) => {
        console.log(response.data);
        setSchedules(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [scheduleDate]);

  const handleDataChange = (date: Date) => {
    setScheduleDate(formatDate(date));
  };

  return (
    <div className="container">
      <Header />
      <div className={style.dataTitle}>
        <h2>Bem vindo(a), {user.nome} </h2>
        <p>
          Esta é sua lista de horários para <strong>{scheduleDate}</strong>
        </p>
      </div>
      <h2 className={style.nextSchedules}>Agendamentos do Dia</h2>
      <div className={style.schedule}>
        <div className={style.cardWrapper}>
          {isLoading && <span className={style.loader}></span>}
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
          {schedules.length <= 0 && !isLoading && (
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
