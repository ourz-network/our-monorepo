import { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import web3 from "@/app/web3";
import { useRouter } from "next/router";

const SplitQuickview = ({
  split,
  isOwned,
  showQuickview,
  setShowQuickview,
  setShowDashboard,
  setActiveDashboard,
}) => {
  const { createZoraAuction } = web3.useContainer();
  const Router = useRouter();

  const [open, setOpen] = useState(showQuickview ? true : false);

  const handleClickManageSplit = () => {
    setActiveDashboard("curation");
    hide();
    setShowDashboard(true);
  };

  const hide = () => {
    setShowQuickview(false);
  };

  return (
    <>
      <Transition.Root show={showQuickview} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
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
              <Dialog.Overlay className="fixed inset-0 hidden transition-opacity bg-opacity-75 bg-dark-accent md:block" />
            </Transition.Child>

            <span
              className="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >
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
                <div className="relative flex items-center w-full px-4 pb-8 overflow-hidden border shadow-2xl bg-dark-background border-dark-border pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute text-dark-primary top-4 right-4 hover:text-dark-secondary sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setShowQuickview(false)}
                  >
                    <span className="">Close</span>
                    {/* <XIcon className="w-6 h-6" aria-hidden="true" /> */}
                  </button>

                  <div className="grid items-start w-full grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="w-48 h-48 m-auto overflow-hidden bg-center bg-cover rounded-lg bg-zorb aspect-w-2 aspect-h-3 sm:col-span-4 lg:col-span-5"></div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h1 className="text-lg font-bold text-dark-primary">
                        {split.nickname}
                      </h1>
                      <h2 className="text-sm font-extrabold text-dark-secondary sm:pr-12">
                        {split.id}
                      </h2>
                      <p className="text-2xl text-dark-primary">
                        {split.creations.length} NFT(s) minted
                      </p>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <div>
                          <h4 className="text-sm font-medium whitespace-pre-wrap text-dark-primary">
                            {split.ETH} ETH unclaimed in Split.
                          </h4>
                        </div>
                        <button
                          type="submit"
                          className="flex items-center justify-center w-full px-8 py-3 mt-6 text-base font-medium border border-transparent rounded-md bg-ourange-300 text-dark-primary hover:bg-ourange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ourange-800"
                          onClick={() => handleClickManageSplit()}
                        >
                          Manage This Split
                        </button>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SplitQuickview;
