import { create } from "zustand";

const inicialAlerta = {
  open: false,
  severity: undefined,
  mensagem: undefined,
};

type AlertaStore = {
  open: boolean;
  severity: "error" | "info" | "success" | "warning" | undefined;
  mensagem: string | undefined;
  abrirAlertaErro: (msg: string) => void;
  abrirAlertaSucesso: (msg: string) => void;
  fecharAlerta: (reason: string) => void;
};

export const usarAlerta = create<AlertaStore>()((set) => ({
  ...inicialAlerta,
  abrirAlertaErro: (msg) => {
    set({
      open: true,
      severity: "error",
      mensagem: msg,
    });
  },
  abrirAlertaSucesso: (msg) => {
    set({
      open: true,
      severity: "success",
      mensagem: msg,
    });
  },
  fecharAlerta: (reason) => {
    if (reason === "timeout") {
      set({
        open: false,
      });
    }
  },
}));
