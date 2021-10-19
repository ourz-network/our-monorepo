import { useState } from "react";
import { Signer } from "ethers";
import DetailedPie from "@/components/Charts/DetailedPie";
import Table from "@/components/Charts/Table";
import { SplitEdition } from "@/utils/OurzSubgraph";
import Button from "@/components/Button";
import {
  mintEditionsToRecipients,
  purchaseEdition,
  setApprovedMinter,
  setEditionPrice,
  withdrawEditionFunds,
} from "@/modules/ethereum/OurPylon";
import { toTrimmedAddress } from "@/utils/index";

const FullPageEdition = ({
  metadata,
  isOwner,
  chartData,
  saleInfo,
  signer,
}: {
  metadata: SplitEdition;
  isOwner: boolean;
  chartData: {
    name: string;
    shares: number;
  }[];
  saleInfo: { maxSupply: number; currentSupply: number; salePrice: number; whitelistOnly: boolean };
  signer: Signer;
}): JSX.Element => {
  const [videoError, setVideoError] = useState(false); // Global loading state
  const recipients = metadata?.creator.splitRecipients;
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
      proxyAddress: metadata.creator.id,
      editionAddress: metadata.id,
      salePrice: formData.price,
    });
    if (!success) {
      // eslint-disable-next-line no-console
      console.log(`ERROR SETTING PRICE`);
      // eslint-disable-next-line no-console
    } else console.log(`SUCCESSFULLY SET PRICE`);
  };

  const withdraw = async () => {
    const success = await withdrawEditionFunds({
      signer,
      proxyAddress: metadata.creator.id,
      editionAddress: metadata.id,
    });
    if (!success) {
      // eslint-disable-next-line no-console
      console.log(`ERROR WITHDRAWING FUNDS`);
      // eslint-disable-next-line no-console
    } else console.log(`SUCCESSFULLY WITHDREW FUNDS`);
  };

  const setEditionMinter = async () => {
    const success = await setApprovedMinter({
      signer,
      proxyAddress: metadata.creator.id,
      editionAddress: metadata.id,
      minterAddress: formData.minterAddress,
      approved: formData.approved,
    });
    if (!success) {
      // eslint-disable-next-line no-console
      console.log(`ERROR SETTING MINTER`);
      // eslint-disable-next-line no-console
    } else console.log(`SUCCESSFULLY SET MINTER`);
  };

  const purchase = async () => {
    const success = await purchaseEdition({
      signer,
      editionAddress: metadata.id,
      salePrice: saleInfo.salePrice,
    });
    if (!success) {
      // eslint-disable-next-line no-console
      console.log(`ERROR PURCHASING EDITION`);
      // eslint-disable-next-line no-console
    } else console.log(`SUCCESSFULLY PURCHASED EDITION`);
  };

  const mintEditions = async () => {
    const success = await mintEditionsToRecipients({
      signer,
      proxyAddress: metadata.creator.id,
      editionAddress: metadata.id,
      recipients: formData.mintTo.split(","),
    });
    if (!success) {
      // eslint-disable-next-line no-console
      console.log(`ERROR MINTING EDITIONS`);
      // eslint-disable-next-line no-console
    } else console.log(`SUCCESSFULLY MINTED EDITIONS`);
  };

  return (
    <div className="w-full h-full">
      <div className="flex object-contain justify-center p-2 border-b md:p-8 max-h-75vh text-dark-primary border-dark-border bg-dark-accent md:min-h-33vh">
        {!metadata && <p>loading...</p>}
        {metadata.animationUrl !== " " && !videoError ? (
          <video
            onError={() => setVideoError(true)}
            muted
            autoPlay
            controls={false}
            loop
            playsInline
          >
            <source src={metadata.animationUrl} />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="object-contain max-w-full max-h-full cont"
            alt={`${metadata.name}`}
            src={metadata.imageUrl}
          />
        )}
      </div>
      {metadata && (
        <div className="p-6 mx-auto mb-16 text-dark-primary max-w-11/12 xl:max-w-5/6">
          <div className="flex flex-col content-center mb-6 w-full lg:space-x-4 lg:flex-row">
            <div className="flex flex-col xl:w-7/12">
              <div className="flex flex-col justify-between">
                <div className="flex justify-between mb-2 h-full">
                  <p className="my-auto text-xl tracking-wider lg:text-4xl font-hero text-dark-primary">{`${metadata.name}`}</p>
                  <p className="my-auto text-lg italic text-dark-primary">{`(${metadata.symbol})`}</p>
                </div>
                <p className="whitespace-pre-wrap break-words text-dark-primary">{`${metadata.description}`}</p>
              </div>
              <div className="flex justify-center mt-4 w-full h-auto border border-dark-border">
                <div className="p-1 m-2 text-center">
                  <p className="mb-1">
                    {saleInfo.maxSupply > 0
                      ? `${saleInfo.currentSupply}/${saleInfo.maxSupply}`
                      : `${saleInfo.currentSupply}/∞`}
                    <br />
                    Minted
                  </p>

                  {saleInfo.salePrice > 0 && saleInfo.maxSupply !== saleInfo.currentSupply && (
                    <div className="w-min">
                      <Button
                        onClick={() => purchase()}
                        text={`Purchase for ${saleInfo.salePrice}Ξ`}
                        isMain={false}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col my-2 border border-dark-border">
                <p className="p-4 w-full text-xs border-b h-min tracking-2-wide border-dark-border">
                  PROOF OF AUTHENTICITY
                </p>
                <a
                  className="hover:underline hover:cursor"
                  href={`https://rinkeby.etherscan.io/address/${metadata.id}#code`}
                >
                  <p className="p-4 w-full text-base font-semibold border-b h-min border-dark-border">
                    View on Etherscan.io
                  </p>
                </a>
                <a
                  className="hover:underline hover:cursor"
                  href={
                    metadata.animationUrl !== " "
                      ? `${metadata.animationUrl}`
                      : `${metadata.imageUrl}`
                  }
                >
                  <p className="p-4 w-full text-base font-semibold border-b h-min border-dark-border">
                    View on IPFS
                  </p>
                </a>
                <p className="p-4 w-full text-base font-semibold border-b h-min border-dark-border hover:cursor-not-allowed">
                  {/* <a
                  className="hover:underline hover:cursor"
                  href={`https://zora.co/?contracts%5B0%5D%5BtokenAddress%5D=/${metadata.id}`}
                > */}
                  <s>View on Zora</s> <i>Coming Soon!</i>
                </p>
                {/* </a> */}
              </div>
              {isOwner && (
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
                        If the Zero Address (0x00..00) is approved, anyone will be allowed to
                        purchase an Edition until the max supply has been reached. You can revoke
                        approval again to pause minting.
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
                                formData.minterAddress ===
                                "0x0000000000000000000000000000000000000000"
                                  ? `${
                                      formData.approved === false
                                        ? `Public minting will be paused.`
                                        : "Anyone will be able to mint."
                                    }`
                                  : `${
                                      formData.minterAddress !==
                                        "0x0000000000000000000000000000000000000000" &&
                                      formData.approved === false
                                        ? `${toTrimmedAddress(
                                            formData?.minterAddress
                                          )} will not be allowed to mint`
                                        : `${toTrimmedAddress(
                                            formData?.minterAddress
                                          )} will be allowed to mint`
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
                        <Button
                          text="Mint To Recipients"
                          isMain={false}
                          onClick={() => mintEditions()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col xl:mt-0 xl:w-5/12 xl:ml-6">
              <div className="flex flex-col p-4 my-2 text-center border border-dark-border">
                <p className="mb-4 text-sm tracking-wide">EIP-2981 Creator Royalty:</p>
                <p className="text-2xl font-semibold font-hero">{`${
                  (metadata.royaltyBPS as unknown as number) / 100
                }%`}</p>
              </div>
              {recipients?.length > 1 && <Table recipients={recipients} />}
              {chartData?.length > 1 && (
                <div className="h-96 border border-dark-border">
                  <div className="m-auto w-96 h-96">
                    <DetailedPie chartData={chartData} secondaryBool={false} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullPageEdition;
