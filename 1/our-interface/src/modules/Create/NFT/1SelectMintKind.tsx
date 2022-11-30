/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { MintForm } from "@/utils/CreateModule";
import { keyDownA11y } from "@/utils/index";

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
  const Router = useRouter();

  function onClick(Kind: MintForm["mintKind"]): void {
    setKind(Kind);
    setMintKind(Kind);
  }

  // useEffect(() => {
  //   setMintKind(kind);
  //
  // }, [kind]);

  return (
    <div className="overflow-hidden justify-center w-full h-75vh bg-dark-background">
      <div className="flex overflow-hidden justify-evenly items-center h-3/4 md:flex-row">
        <div
          role="button"
          // className="flex flex-col justify-center items-center text-center w-preview h-preview bg-dark-accent text-dark-primary"
          className={`w-preview h-preview bg-dark-accent text-dark-primary justify-center flex items-center text-center flex-col border ${
            kind === "1/1" ? "border-dark-ourange" : "border-dark-border"
          }`}
          onClick={() => onClick("1/1")}
          tabIndex={0}
          onKeyDown={keyDownA11y(() => onClick("1/1"))}
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
          onClick={() => onClick("Edition")}
          tabIndex={0}
          onKeyDown={keyDownA11y(() => onClick("Edition"))}
        >
          <b>Edition</b> <br /> Create a Zora &lsquo;Edition&rsquo; <br /> - Set the Max Supply &
          Mint Price. <br /> - ERC-721
        </div>
      </div>
      <div className="flex justify-around mx-auto w-3/4">
        <Button isMain={false} text="Back" onClick={() => Router.push(`/create`)} />
        {mintForm.mintKind && <Button isMain={false} text="Next" onClick={next} />}
      </div>
    </div>
  );
};

export default SelectMintKind;
