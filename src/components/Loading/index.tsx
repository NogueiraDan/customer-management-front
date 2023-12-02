import style from "./Loading.module.css";

interface TypeProps {
  type: "request" | "spinner";
}
export default function Loading({ type }: TypeProps) {
  return (
    <>
      {type === "spinner" ? (
        <span className={style.loader}></span>
      ) : (
        <p className={`${style.loadingText} ${style.fadeIn}`}>
          Aguarde um pouco...
        </p>
      )}
    </>
  );
}
