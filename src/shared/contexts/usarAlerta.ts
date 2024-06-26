import { create } from "zustand";

const inicialAlerta = {
  open: false,
  severity: undefined,
  mensagem: undefined,
};

type StoreAlert = {
  open: boolean;
  severity: "error" | "info" | "success" | "warning" | undefined;
  mensagem: string | undefined;
  openAlertError: (msg: string) => void;
  openAlertSucess: (msg: string) => void;
  closeAlert: (reason: string) => void;
};

export const usarAlerta = create<StoreAlert>()((set) => ({
  ...inicialAlerta,
  openAlertError: (msg) => {
    set({
      open: true,
      severity: "error",
      mensagem: msg,
    });
  },
  openAlertSucess: (msg) => {
    set({
      open: true,
      severity: "success",
      mensagem: msg,
    });
  },
  closeAlert: (reason) => {
    if (reason === "timeout") {
      set({
        open: false,
      });
    }
  },
}));
