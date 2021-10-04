/* eslint-disable @next/next/no-img-element */ // next/image not necessary for upload flow

import React, { useCallback, useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import web3 from "@/app/web3";
import PageLayout from "@/components/Layout/PageLayout";
import { SplitRecipient } from "@/modules/subgraphs/ourz/types";

import { MintForm } from "../types/types";

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
  proxyAddress: string | string[];
  splitRecipients: SplitRecipient[];
  // eslint-disable-next-line consistent-return
}): JSX.Element => {
  // const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const { address, mintZoraSplit } = web3.useContainer(); // Global State
  const [firstSale, setFirstSale] = useState();
  const [secondarySales, setSecondarySales] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [mintForm, setFormData] = useState<MintForm>({
    mintKind: "1/1",
    media: {
      file: null,
      mimeType: null,
      preview: null,
      blob: null,
    },
    metadata: {
      name: null, // title
      description: null,
      split_recipients: null,
      version: "Ourz20210928",
      mimeType: "",
      symbol: null,
      animation_url: null,
      image_url: null,
      editionSize: 0,
    },
    creatorBidShare: 10,
    auctionInfo: {
      reservePrice: 1,
      duration: 0,
      auctionCurrency: "0x0000000000000000000000000000000000000000",
    },
  });

  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    function formatChartData(recipients: SplitRecipient[]): void {
      setFormData({
        ...mintForm,
        splitMetadata: recipients,
      });

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

    if (splitRecipients) {
      formatChartData(splitRecipients);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splitRecipients, mintForm.creatorBidShare]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...mintForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async () => {
    // setLoading(true);

    if (proxyAddress) {
      // minting as Split Proxy by Owner
      const tokenId = await mintZoraSplit({ formData: mintForm, proxyAddress });
      if (tokenId) {
        Router.push(`/nft/${tokenId}`).then(
          () => {},
          () => {}
        );
        // setLoading(false);
      }
    } else {
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
  const [files, setFiles] = useState<(File & { preview: string })[] | undefined>([]);
  const handleMedia = () => {
    // eslint-disable-next-line prefer-destructuring
    mintForm.media.file = files[0];
    mintForm.media.mimeType = files[0].type;
    mintForm.media.preview = files[0].preview;
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
        setFormData({
          ...mintForm,
          media: {
            ...mintForm.media,
            blob: arrayBuffer,
          },
        });
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

  // Info about upload, delete later.
  const acceptedFileItems = acceptedFiles.map((file: File & { path: string }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes - {file.type}
    </li>
  ));

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
          <SelectMintKind mintForm={mintForm} setFormData={setFormData} next={next} />
        </PageLayout>
      );
    case 2:
      return (
        <PageLayout>
          <MintUpload
            handleMedia={handleMedia}
            acceptedFiles={acceptedFiles}
            acceptedFileItems={acceptedFileItems}
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
            handleChange={handleChange}
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
            address={address}
            mintForm={mintForm}
            firstSale={firstSale}
            secondarySales={secondarySales}
            proxyAddress={proxyAddress}
            thumbs={thumbs}
            back={back}
            onSubmit={onSubmit}
          />
        </PageLayout>
      );
  }
};

export default NewMintMultistepForm;
