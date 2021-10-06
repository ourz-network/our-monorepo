/* eslint-disable react/jsx-props-no-spreading */
import Button from "@/components/Button";

const MintUpload = ({
  handleMedia,
  acceptedFiles,
  acceptedFileItems,
  getRootProps,
  getInputProps,
  thumbs,
  next,
  back,
}: {
  handleMedia: () => void;
  acceptedFiles: File[];
  acceptedFileItems: JSX.Element[];
  getRootProps: () => void;
  getInputProps: () => void;
  thumbs: JSX.Element[];
  next: () => void;
  back: () => void;
}): JSX.Element => {
  // Because of react-dropzone, handleChange() from createMultiStepForm must be carried out manually for this step, then we can call next().
  const submitMedia = () => {
    handleMedia();
    next();
  };

  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full md:flex-row bg-dark-background">
      <div className="flex flex-col shadow-xl lg:-mt-32" id="dropzone">
        <form>
          <div
            {...getRootProps({
              className:
                "px-16 pb-12 pt-8 border border-dark-border bg-dark-background cursor-pointer flex flex-col",
            })}
          >
            <label
              htmlFor="uploadMedia"
              className="mb-4 font-semibold text-center text-dark-primary"
            >
              Upload Media
              <input {...getInputProps()} />
            </label>
            <p className="pt-12 pb-6 text-dark-primary">
              Drag &amp; drop your file here, or <u>click to select a file</u>.
            </p>
            <p className="text-sm italic text-center text-dark-secondary">
              Accepted file types: image, audio, video, or text.
              <br />
              Max file size: 100MB.
            </p>
          </div>
          <div className="flex justify-evenly py-2 border-r border-b border-l border-dark-border">
            {/* <div className="mx-auto space-x-2 shadow-md border-dark-border"> */}
            <Button isMain={false} text="Back" onClick={back} />
            {acceptedFiles.length > 0 ? (
              <Button
                isMain={false}
                text="Next"
                // className="place-self-end px-4 py-2 m-3 text-base font-semibold border shadow-md bg-dark-background hover:bg-green-100 hover:cursor-pointer"
                onClick={submitMedia}
              />
            ) : (
              <div className="hidden" />
            )}
          </div>
          {/* </div> */}
        </form>
      </div>
      <div className="flex flex-col shadow-xl lg:-mt-32" id="preview">
        <p className="pb-2 text-center text-dark-primary">Preview</p>
        <div className="flex flex-col items-center p-5 border border-dark-border min-h-preview min-w-preview text-dark-secondary">
          {thumbs}
          <p className="text-xs italic text-center">{acceptedFileItems}</p>
        </div>
      </div>
    </div>
  );
};

export default MintUpload;
