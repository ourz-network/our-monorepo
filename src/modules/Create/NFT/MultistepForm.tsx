/* eslint-disable @next/next/no-img-element */ // next/image not necessary for upload flow

import React, { useCallback, useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import web3 from "@/app/web3";
import PageLayout from "@/components/Layout/PageLayout";
import { createZoraEdition, mintZora } from "@/ethereum/OurPylon";
import { SplitRecipient } from "@/utils/OurzSubgraph";

import { MintForm } from "@/utils/CreateModule";

// Steps 1-4:
import SelectMintKind from "./1SelectMintKind";
import MintUpload from "./2Upload";
import MintDetails from "./3Details";
import MintConfirm from "./4Confirm";

/**
 * NewMintMultistepForm()
 * Maintains state while navigating through a multi-step form to mint an NFT.
 * There is likely a *much* better way to compartmentalize all these moving parts.
 * The basic gist of it is that this container keeps all form's info in state,
 * as well as the functions to modify it.
 * React-hook-form is a necessary evil for splits' dynamic fields, AFAIK.
 * So is repeatedly unshifting the user's somewhat-static split field.
 */

// eslint-disable-next-line consistent-return
const NewMintMultistepForm = ({
  proxyAddress,
  splitRecipients,
}: {
  proxyAddress: string;
  splitRecipients: SplitRecipient[];
  // eslint-disable-next-line consistent-return
}): JSX.Element => {
  // const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const { address, signer, network } = web3.useContainer(); // Global State
  const [firstSale, setFirstSale] = useState();
  const [secondarySales, setSecondarySales] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [mintForm, setFormData] = useState<MintForm>({
    mintKind: "1/1",
    media: {
      file: null,
      mimeType: "",
      preview: "",
      blob: "",
    },
    metadata: {
      name: "", // title
      description: "",
      split_recipients: splitRecipients,
      version: "Ourz20210928",
      mimeType: "",
      symbol: "",
      animation_url: "",
      editionSize: 0,
    },
    creatorBidShare: 10,
    auctionInfo: {
      reservePrice: 1,
      duration: 1,
    },
  });

  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    function formatChartData(recipients: SplitRecipient[]) {
      // setFormData({
      //   ...mintForm,
      //   metadata: {
      //     ...mintForm.metadata,
      //     split_recipients: recipients,
      //   },
      // });

      // create first sale chart data
      let newChartData = recipients.flatMap((recipient) => ({
        name: `${recipient.name || recipient.user.id}`,
        shares: Number(recipient.shares),
      }));

      setFirstSale(newChartData);

      // edit for secondary sales chart data
      newChartData = newChartData.map((recipient) => ({
        name: recipient.name,
        shares: Number(recipient.shares) * Number((mintForm.creatorBidShare / 100).toFixed(4)),
      }));

      newChartData.push({
        name: "Owner",
        shares: 100 - mintForm.creatorBidShare,
      });

      setSecondarySales(newChartData);
    }

    if (splitRecipients && mintForm.creatorBidShare) {
      formatChartData(splitRecipients);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splitRecipients]);

  const setMintKind = (Kind: MintForm["mintKind"]) => {
    setFormData((prevState) => ({
      ...prevState,
      mintKind: Kind,
    }));
  };

  const handleMetadataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      metadata: {
        ...prevState.metadata,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const setAuctionInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      auctionInfo: {
        ...prevState.auctionInfo,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const onSubmit = async () => {
    if (
      proxyAddress &&
      signer &&
      network?.chainId === 4 &&
      (mintForm.mintKind === "1/1" || mintForm.mintKind === "1/1 Auction")
    ) {
      // minting as Split Proxy by Owner
      const tokenId = await mintZora({
        signer,
        networkId: network.chainId,
        proxyAddress,
        mintForm,
      });
      if (tokenId) {
        Router.push(`/nft/${tokenId}`).then(
          () => {},
          () => {}
        );
        // setLoading(false);
      }
    } else if (
      proxyAddress &&
      signer &&
      network?.chainId === 4 &&
      mintForm.mintKind === "Edition"
    ) {
      await createZoraEdition({ signer, networkId: network.chainId, proxyAddress, mintForm });
      /*
       * minting as connected web3Wallet
       * const tokenId = await mintNFTSolo(mintForm); // received as 'media';
       * if (tokenId) {
       *   Router.push(`/nft/${tokenId}`);
       *   setLoading(false);
       * }
       */
    }
  };
  /*
   * router.push(`/${address}/success`)
   * } catch (e) {
   * }
   */

  /**
   * react-dropzone
   * Handles upload of images and previews throughout the steps.
   *
   */
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const handleMedia = () => {
    setFormData((prevState) => ({
      ...prevState,
      media: {
        ...prevState.media,
        file: files[0],
        mimeType: files[0].type,
        preview: files[0].preview,
      },
    }));
  };
  /**
   * onDrop()
   * creates an instance of the file as a buffer, as well as
   * creating preview thumbnails for the rest of the upload process.
   * When a user drag'n'drops (or selects via explorer/finder prompt) a file,
   * the path to the file on the user's device is protected from the browser.
   * However, further access to the file is needed for Zora ZDK's sha256FromBuffer().
   * Reference: https://react-dropzone.js.org/ > Usage > the first 'Warning' header
   */
  const onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void = useCallback((dropzoneFiles) => {
    dropzoneFiles.forEach((file) => {
      // Takes the acceptedFile and reads it for uploading as a blob.
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        // Save the readFile to state under mediaBlob
        const arrayBuffer = reader.result;
        setFormData((prevState) => ({
          ...prevState,
          media: {
            ...prevState.media,
            blob: arrayBuffer,
          },
        }));
      };
    });

    // Preview Thumbnails
    setFiles(
      dropzoneFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "image/*, video/*, audio/*, text/plain",
    onDrop,
  });

  // Mapping is not exactly necessary, only 1 file can be uploaded, but too lazy to rewrite.
  // eslint-disable-next-line array-callback-return
  const thumbs = files.map((file) => (
    <div className="box-border inline-flex p-5" key={file.name}>
      <div className="flex overflow-hidden min-w-0 h-96">
        <img src={file.preview} className="block w-auto h-full" alt="Preview of your upload" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  // eslint-disable-next-line default-case
  switch (currentStep) {
    case 1:
      return (
        <PageLayout>
          <SelectMintKind mintForm={mintForm} setMintKind={setMintKind} next={next} />
        </PageLayout>
      );
    case 2:
      return (
        <PageLayout>
          <MintUpload
            handleMedia={handleMedia}
            acceptedFiles={acceptedFiles}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            thumbs={thumbs}
            next={next}
            back={back}
          />
        </PageLayout>
      );
    case 3:
      return (
        <PageLayout>
          <MintDetails
            mintForm={mintForm}
            handleChange={handleMetadataChange}
            thumbs={thumbs}
            next={next}
            back={back}
          />
        </PageLayout>
      );
    case 4:
      return (
        <PageLayout>
          <MintConfirm
            address={address as string}
            mintForm={mintForm}
            firstSale={firstSale}
            secondarySales={secondarySales}
            proxyAddress={proxyAddress}
            setMintKind={setMintKind}
            setAuctionInfo={setAuctionInfo}
            thumbs={thumbs}
            back={back}
            onSubmit={onSubmit}
          />
        </PageLayout>
      );
  }
};

export default NewMintMultistepForm;
