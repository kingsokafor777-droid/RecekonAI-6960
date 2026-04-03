import { createContext, useContext, useState } from "react";
import { ContactModal } from "./ContactModal";

interface ModalCtx {
  openContact: (message?: string) => void;
  closeContact: () => void;
}

const Ctx = createContext<ModalCtx>({ openContact: () => {}, closeContact: () => {} });

export function useModal() { return useContext(Ctx); }

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <Ctx.Provider value={{
      openContact: (m = "") => { setMsg(m); setOpen(true); },
      closeContact: () => setOpen(false),
    }}>
      {children}
      <ContactModal open={open} onClose={() => setOpen(false)} defaultMessage={msg} />
    </Ctx.Provider>
  );
}
