import style from "./Header.module.css";
import logo from "../../assets/logo_branca.png";
import custome from "../../assets/custome.png"
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export function Header() {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className={style.background}>
      <div className={style.image} onClick={() => navigate("/dashboard")}>
      <img src={custome} alt="" width={80} height={80}/>
        {/* <span>Customer Management</span> */}
      </div>
      <div className={style.profile}>
        <div className={style.dropdown} onClick={() => setOpen(!open)}>
          <CgProfile size={18} />
          <span>Perfil</span>

          <ul className={`${style.dropdownMenu} ${open && style.open}`}>
            <Link to={"/customers"}>
              <li className={style.dropdownMenuItem}>Cadastrar clientes</li>
            </Link>

            <Link to={"/schedules"}>
              <li className={style.dropdownMenuItem}>Agendamentos</li>
            </Link>

            <Link to={"/list-customers"}>
              <li className={style.dropdownMenuItem}>Listar Clientes</li>
            </Link>

            {/* <Link to={"/edit-profile"}>
              <li className={style.dropdownMenuItem}>Editar Perfil</li>
            </Link> */}
            <li className={style.dropdownMenuItem} onClick={signOut}>
              Sair
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
