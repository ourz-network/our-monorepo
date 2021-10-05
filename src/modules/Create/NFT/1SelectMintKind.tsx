/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { MintForm } from "@/utils/CreateModule";

function keyDownA11y(handler) {
  return function onKeyDown(event) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (["keydown", "keypress"].includes(event.type) && ["Enter", " "].includes(event.key)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      handler();
    }
  };
}

const SelectMintKind = ({
  mintForm,
  setMintKind,
  next,
}: {
  mintForm: MintForm;
  setMintKind: (Kind: MintForm["mintKind"]) => void;
  next: () => void;
}): JSX.Element => {
  const [kind, setKind] = useState<MintForm["mintKind"]>(mintForm.mintKind);

  // function onClick(Kind: MintForm["mintKind"]): void {
  //   setKind(Kind);
  //   setMintKind(Kind);
  // }

  useEffect(() => {
    if (mintForm.mintKind !== kind) {
      setMintKind(kind);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  return (
    <div className="flex-col justify-center w-full h-full bg-dark-background">
      <div className="flex justify-evenly items-center self-center place-self-center w-full align-middle min-h-1/2 h-min md:flex-row">
        <div
          role="button"
          // className="flex flex-col justify-center items-center text-center w-preview h-preview bg-dark-accent text-dark-primary"
          className={`w-preview h-preview bg-dark-accent text-dark-primary justify-center flex items-center text-center flex-col border ${
            kind === "1/1" ? "border-dark-ourange" : "border-dark-border"
          }`}
          onClick={() => setKind("1/1")}
          tabIndex={0}
          onKeyDown={() => keyDownA11y(setKind("1/1"))}
        >
          <b>1/1</b> <br /> - Mint a Unique, 1/1 ERC-721 NFT through the Zora Protocol <br /> -
          Option to list on Zora&apos;s Auction House
        </div>
        <div
          role="button"
          // className="flex flex-col justify-center items-center text-center w-preview h-preview bg-dark-accent text-dark-primary"
          className={`w-preview h-preview bg-dark-accent text-dark-primary justify-center flex items-center text-center flex-col border ${
            kind === "Edition" ? "border-dark-ourange" : "border-dark-border"
          }`}
          onClick={() => setKind("Edition")}
          tabIndex={0}
          onKeyDown={() => keyDownA11y(setKind("Edition"))}
        >
          <b>Edition</b> <br /> Create a Zora &lsquo;Edition&rsquo; <br /> - Set the Max Supply &
          Mint Price. <br /> - ERC-721
        </div>
      </div>
      <div className="justify-self-center mx-auto w-min">
        <Button isMain={false} text="Next" onClick={next} />
      </div>
    </div>
  );
};

export default SelectMintKind;
