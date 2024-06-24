import { faHouse, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { MenuLateralIcones } from "./types";

export const menuLateralBotoes: MenuLateralIcones = [
  {
    icone: faHouse,
    texto: "Home",
    rota: "/",
  },
  {
    icone: faUserTie,
    texto: "Boletos",
    rota: "/autenticado/boletos",
  },
];
