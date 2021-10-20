/* eslint-disable no-console */
import React, { useState } from "react";
import { Signer } from "ethers";
import {
  setEditionPrice,
  withdrawEditionFunds,
  setApprovedMinter,
  mintEditionsToRecipients,
} from "@/modules/ethereum/OurPylon";
import { toTrimmedAddress } from "@/utils/index";
import { NFTCard } from "@/modules/subgraphs/utils";
import Button from "../Button";

const ManageEditionSection = ({ post, signer }: { post: NFTCard; signer: Signer }): JSX.Element => {
  const [formData, setFormData] = useState({
    minterAddress: "0x0000000000000000000000000000000000000000",
    approved: false,
    mintTo: "",
    price: "0",
  });

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleMinter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleMintTo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value.replace(/\s/g, ""),
    }));
  };

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const setSalePrice = async () => {
    const success = await setEditionPrice({
      signer,
      proxyAddress: post.creator,
      editionAddress: post.editionAddress as string,
      salePrice: formData.price,
    });
    if (!success) {
      console.log(`ERROR SETTING PRICE`);
    } else console.log(`SUCCESSFULLY SET PRICE`);
  };

  const withdraw = async () => {
    const success = await withdrawEditionFunds({
      signer,
      proxyAddress: post.creator,
      editionAddress: post.editionAddress as string,
    });
    if (!success) {
      console.log(`ERROR WITHDRAWING FUNDS`);
    } else console.log(`SUCCESSFULLY WITHDREW FUNDS`);
  };

  const setEditionMinter = async () => {
    const success = await setApprovedMinter({
      signer,
      proxyAddress: post.creator,
      editionAddress: post.editionAddress as string,
      minterAddress: formData.minterAddress,
      approved: formData.approved,
    });
    if (!success) {
      console.log(`ERROR SETTING MINTER`);
    } else console.log(`SUCCESSFULLY SET MINTER`);
  };

  const mintEditions = async () => {
    const success = await mintEditionsToRecipients({
      signer,
      proxyAddress: post.creator,
      editionAddress: post.editionAddress as string,
      recipients: formData.mintTo.split(","),
    });
    if (!success) {
      console.log(`ERROR MINTING EDITIONS`);
    } else console.log(`SUCCESSFULLY MINTED EDITIONS`);
  };

  return (
    <div className="hidden p-4 space-y-2 border-2 md:flex md:flex-col border-dark-ourange">
      <p className="mx-auto mb-2 text-xl">Manage Your Edition</p>
      <div className="flex space-x-2">
        <div className="flex flex-col place-content-evenly py-4 space-y-2 w-3/5 text-center border border-dark-border">
          <p className="font-semibold">Set the Purchase Price</p>
          <p className="text-xs italic text-center">in ETH</p>
          <div className="flex justify-center space-x-2 w-full">
            <div className="flex mx-2">
              <input
                className="visible w-24 outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                min="0.0000001"
                placeholder="0.1"
                onChange={handlePrice}
                aria-label="price"
              />
              <span className="inline-flex items-center px-3 text-sm border border-l-0 text-dark-primary border-dark-border md bg-dark-background">
                Ξ
              </span>
            </div>
            <div className="mx-2 my-auto w-min">
              <Button text="Set Price" isMain={false} onClick={() => setSalePrice()} />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-around p-4 my-auto space-y-2 w-2/5 h-full border border-dark-border">
          <p className="font-semibold text-center">Withdraw Funds</p>
          <div className="mx-auto w-min">
            <Button text="Withdraw" isMain={false} onClick={() => withdraw()} />
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col place-content-evenly p-4 space-y-2 text-center border border-dark-border">
          <p className="font-semibold">Minting Whitelist</p>
          <p>Enter an address to add to, or remove from, the whitelist.</p>
          <p className="text-xs italic text-center">
            If the Zero Address (0x00..00) is approved, anyone will be allowed to purchase an
            Edition until the max supply has been reached. You can revoke approval again to pause
            minting.
          </p>

          <input
            className="visible mb-8 outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
            type="text"
            id="minterAddress"
            name="minterAddress"
            value={formData.minterAddress}
            onChange={handleMinter}
            aria-label="minter"
          />
          <div className="flex justify-between pt-4 space-x-3">
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-3 text-center">
                <p>Approved?</p>
                <input
                  className="visible outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                  type="checkbox"
                  id="approved"
                  name="approved"
                  value={formData.approved as unknown as string}
                  onChange={handleCheckbox}
                  aria-label="Allow Public Mint"
                />
              </div>
              {formData?.minterAddress && (
                <p className="break-words">
                  {`${
                    formData.minterAddress === "0x0000000000000000000000000000000000000000"
                      ? `${
                          formData.approved === false
                            ? `Public minting will be paused.`
                            : "Anyone will be able to mint."
                        }`
                      : `${
                          formData.minterAddress !== "0x0000000000000000000000000000000000000000" &&
                          formData.approved === false
                            ? `${toTrimmedAddress(
                                formData?.minterAddress
                              )} will not be allowed to mint`
                            : `${toTrimmedAddress(formData?.minterAddress)} will be allowed to mint`
                        } `
                  }`}{" "}
                </p>
              )}
            </div>
            <div className="my-auto">
              <Button
                text="Set Approved Minter"
                isMain={false}
                onClick={() => setEditionMinter()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col place-content-evenly p-4 space-y-2 w-full text-center border border-dark-border">
          <p className="font-semibold">Mint Editions</p>
          <p>Send to an address or a list of addresses.</p>
          <p className="text-xs italic text-center">
            If multiple addresses, separate them with a comma.
          </p>

          <textarea
            className="visible p-4 h-32 break-all border border-dark-border bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
            id="mintTo"
            name="mintTo"
            rows={3}
            value={formData.mintTo}
            onChange={(e) => handleMintTo(e)}
            aria-label="mint recipients"
          />
          <div className="pt-2 mx-auto">
            <Button text="Mint To Recipients" isMain={false} onClick={() => mintEditions()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEditionSection;
