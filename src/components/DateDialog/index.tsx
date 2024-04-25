import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { Dialog } from "@headlessui/react";

function DateDialog({ state, setState, open, setOpen }: any) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center  bg-[#11000066] backdrop-blur"
    >
      <div className="text-black">
        <DateRangePicker
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          minDate={new Date()}
        />
      </div>
    </Dialog>
  );
}

export default DateDialog;
