import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import web3 from "@/app/web3";
import PageLayout from "@/components/Layout/PageLayout";
import { getOwnedSplits } from "@/modules/graphProtocol/ourz/functions"; // GraphQL client

//Steps 1-4:
// import MintSelectSplit from "./MintSelectSplit";
import MintUpload from "./MintUpload";
import MintDetails from "./MintDetails";
import MintConfirm from "./MintConfirm";

/** NewMintMultistepForm()
 * Maintains state while navigating through a multi-step form to mint an NFT.
 * There is likely a *much* better way to compartmentalize all these moving parts.
 * The basic gist of it is that this container keeps all form's info in state,
 * as well as the functions to modify it.
 * React-hook-form is a necessary evil for splits' dynamic fields, AFAIK.
 * So is repeatedly unshifting the user's somewhat-static split field.
 */

const NewMintMultistepForm = ({ proxyAddress, splitRecipients }) => {
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const { address, mintZoraSplit } = web3.useContainer(); // Global State
  const [firstSale, setFirstSale] = useState();
  const [secondarySales, setSecondarySales] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    media: "",
    mediaKind: "",
    mediaPreview: "",
    mediaBlob: "",
    title: "",
    description: "",
    creatorBidShare: 10,
    splitMetadata: "",
    mintSuccess: false,
  });

  const next = () => {
    setCurrentStep(currentStep + 1);
    // console.log("formData: ", formData);
  };
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    function formatChartData(recipients) {
      setFormData({
        ...formData,
        splitMetadata: recipients,
      });
      // console.log(`recipients: `, recipients);

      // create first sale chart data
      let newChartData = recipients.flatMap((recipient) => ({
        name: `${recipient.name || recipient.user.id}`,
        shares: Number(recipient.shares),
      }));

      setFirstSale(newChartData);

      // edit for secondary sales chart data
      newChartData = newChartData.map((recipient) => ({
        name: recipient.name,
        shares:
          Number(recipient.shares) *
          (Number(formData.creatorBidShare) / 100).toFixed(4),
      }));

      newChartData.push({
        name: "Owner",
        shares: 100 - Number(formData.creatorBidShare),
      });

      setSecondarySales(newChartData);
    }

    if (splitRecipients) {
      formatChartData(splitRecipients);
    }
  }, [splitRecipients, formData.creatorBidShare]);

  const handleMedia = () => {
    formData.media = files[0];
    formData.mediaKind = files[0].type;
    formData.mediaPreview = files[0].preview;
    // console.log("files: ", files);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    // console.log(`formData`, formData);
  };

  const onSubmit = async () => {
    setLoading(true);

    if (proxyAddress) {
      // minting as Split Proxy by Owner
      const tokenId = await mintZoraSplit({ formData, proxyAddress });
      if (tokenId) {
        Router.push(`/nft/${tokenId}`);
        setLoading(false);
      }
    } else {
      // minting as connected web3Wallet
      const tokenId = await mintNFTSolo(formData); // received as 'media';
      if (tokenId) {
        Router.push(`/nft/${tokenId}`);
        //   console.log("minted")
        setLoading(false);
      }
    }
  };
  //router.push(`/${address}/success`)
  // } catch (e) {
  //   console.log(e)
  // }

  /** react-dropzone
   * Handles upload of images and previews throughout the steps.
   * */
  const [files, setFiles] = useState([]);

  /** onDrop()
   * creates an instance of the file as a buffer, as well as
   * creating preview thumbnails for the rest of the upload process.
   * When a user drag'n'drops (or selects via explorer/finder prompt) a file,
   * the path to the file on the user's device is protected from the browser.
   * However, further access to the file is needed for Zora ZDK's sha256FromBuffer().
   * Reference: https://react-dropzone.js.org/ > Usage > the first 'Warning' header
   */
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      // Takes the acceptedFile and reads it for uploading as a blob.
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Save the readFile to state under mediaBlob
        const arrayBuffer = reader.result;
        setFormData({
          ...formData,
          mediaBlob: arrayBuffer,
        });
        // console.log("MultiStepForm - onDrop() \narrayBuffer: ", arrayBuffer);
      };
    });

    // Preview Thumbnails
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "image/*, video/*, audio/*, text/plain",
    onDrop: onDrop,
  });

  // Info about upload, delete later.
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes - {file.type}
    </li>
  ));

  // Mapping is not exactly necessary, only 1 file can be uploaded, but too lazy to rewrite.
  const thumbs = files.map((file) => (
    <div className="box-border inline-flex p-5" key={file.name}>
      <div className="flex min-w-0 overflow-hidden h-96">
        {/* // eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={file.preview}
          className="block w-auto h-full"
          alt="Preview of your image"
        />
      </div>
    </div>
  ));
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  switch (currentStep) {
    case 1:
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
    case 2:
      return (
        <PageLayout>
          <MintDetails
            data={formData}
            handleChange={handleChange}
            thumbs={thumbs}
            next={next}
            back={back}
          />
        </PageLayout>
      );
    case 3:
      return (
        <PageLayout>
          <MintConfirm
            address={address}
            formData={formData}
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
