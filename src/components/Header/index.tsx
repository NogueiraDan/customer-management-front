import style from "./Header.module.css";
import custome from "../../assets/custome.png"
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export function Header() {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const links = [
    {
      name: "Cadastrar clientes",
      to:"/customers",
    },
    {
      name: "Agendamentos",
      to:"/schedules",
    },
    {
      name: "Listar Clientes",
      to:"/list-customers",
    },
  ]
  return (
    <header className={style.background}>
      <div className={style.image} onClick={() => navigate("/dashboard")}>
      <img src={custome} alt="" width={80} height={80}/>
      </div>
      <div className={style.profile}>
        <div className={style.dropdown} onClick={() => setOpen(!open)}>
          <CgProfile size={18} />
          <span>Perfil</span>

          <ul className={`${style.dropdownMenu} ${open && style.open}`}>

            {links.map((link)=>(
              <li key={link.name} className={style.dropdownMenuItem}>
                <Link to={link.to}>{link.name}</Link>
              </li>
            ))}
            <li className={style.dropdownMenuItem} onClick={signOut}>
              Sair
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
