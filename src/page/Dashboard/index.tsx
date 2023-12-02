import "react-day-picker/dist/style.css";
import style from "./Dashboard.module.css";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { formatDate, fetchHeaders, BASE_URL } from "../../utils/";
import { Schedule } from "../../types";
import Loading from "../../components/Loading";

export function Dashboard() {
  const date = new Date();
  const { user } = useAuth();
  const dataFormatada = formatDate(date);
  const [scheduleDate, setScheduleDate] = useState<string>(dataFormatada);

  const [schedules, isLoading] = useFetch({
    url: `${BASE_URL}/profissionais/${user.id}/agendamentos-hoje?data=${scheduleDate}`,
    method: "GET",
    headers: fetchHeaders(),
    dependencies: [scheduleDate],
  });

  const handleDataChange = (date: Date) => {
    setScheduleDate(formatDate(date));
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className={style.dataTitle}>
          <h2>Bem vindo(a), {user.nome} </h2>

          <h2 className={style.nextSchedules}>
            Agendamentos do Dia <strong>{scheduleDate}</strong>
          </h2>
        </div>
        <div className={style.schedule}>
          <div className={style.cardWrapper}>
            {isLoading && <Loading />}
            {schedules && (
              <>
                {schedules.map((schedule: Schedule, index: never) => {
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
    </>
  );
}
