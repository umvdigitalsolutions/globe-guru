"use client";

import { useEffect, useRef } from "react";

export default function Modal({ children, onClose, busy = false, labelledBy }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return <dialog ref={ref} className="admin-modal-backdrop" aria-labelledby={labelledBy} onCancel={(event) => { event.preventDefault(); if (!busy) onClose(); }} onClick={(event) => { if (event.target === event.currentTarget && !busy) onClose(); }}>{children}</dialog>;
}
