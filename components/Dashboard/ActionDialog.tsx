import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ActionDialog = ({
  children,
  showDialog,
  setShowDialog,
}: {
  children: Array<any>;
  showDialog: boolean;
  setShowDialog: () => void;
}): JSX.Element => {
  const [open, setOpen] = useState(!!showDialog);

  return (
    <>
      <Transition.Root show={showDialog} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-50"
          open={open}
          onClose={setOpen}
          static
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-opacity-75 transition-opacity bg-dark-accent md:block" />
            </Transition.Child>

            <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex w-full text-base text-left transition transform md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="flex overflow-hidden relative items-center px-4 pt-14 pb-8 w-full border shadow-2xl bg-dark-background border-dark-border sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    href="#"
                    tabIndex={0}
                    className="absolute top-4 right-4 text-dark-primary hover:text-dark-secondary sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setShowDialog(false)}
                  >
                    <span className="">Close</span>
                    {/* <XIcon className="w-6 h-6" aria-hidden="true" /> */}
                  </button>
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ActionDialog;
