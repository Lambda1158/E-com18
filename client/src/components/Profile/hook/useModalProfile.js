import { useEffect, useState } from "react";

export default function useModalProfile() {
  const [modal, setModal] = useState(false);
  const toogleModal = () => {
    setModal((prev) => !prev);
  };
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "unset";
  }, [modal]);
  return { modal, toogleModal };
}
