/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import Button from "@/components/Button";
import { MintForm } from "@/types/CreateModule";

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
  setFormData,
  next,
}: {
  mintForm: MintForm;
  setFormData: React.Dispatch<React.SetStateAction<MintForm>>;
  next: () => void;
}): JSX.Element => {
  const [kind, setKind] = useState<MintForm["mintKind"]>("1/1");

  const onClick = (Kind: MintForm["mintKind"]) => {
    setKind(Kind);
    setFormData({
      ...mintForm,
      mintKind: Kind,
    });
  };

  return (
    <div className="flex-col w-full h-full bg-dark-background">
      <div className="flex justify-evenly items-center md:flex-row">
        <div
          role="button"
          className={`w-preview h-preview bg-dark-accent ${
            kind === "1/1" ? "border-dark-ourange" : "border-dark-border"
          }`}
          onClick={() => onClick("1/1")}
          tabIndex={0}
          onKeyDown={keyDownA11y(onClick("1/1"))}
        >
          1/1
        </div>
        <div
          role="button"
          className={`w-preview h-preview bg-dark-accent ${
            kind === "Edition" ? "border-dark-ourange" : "border-dark-border"
          }`}
          onClick={() => onClick("Edition")}
          tabIndex={0}
          onKeyDown={keyDownA11y(onClick("Edition"))}
        >
          Edition
        </div>
      </div>
      <Button isMain={false} text="Next" onClick={next} />
    </div>
  );
};

export default SelectMintKind;
