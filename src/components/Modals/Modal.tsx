import ReactModal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "none",
    border: "none",
    borderRadius: "12px",
    overflow: "none",
  },
};

export function Modal({ children, open, setOpen }: { children: any; open: boolean; setOpen: any }) {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={(e) => {
        setOpen(false);
      }}
      style={customStyles}
      contentLabel="Example Modal"
      appElement={document.getElementById("root") as HTMLElement}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ReactModal>
  );
}
