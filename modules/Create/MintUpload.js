import Button from "@/components/Button";

const MintUpload = (props) => {
  const {
    handleMedia,
    acceptedFiles,
    acceptedFileItems,
    getRootProps,
    getInputProps,
    thumbs,
    next,
  } = props;

  //Because of react-dropzone, handleChange() from createMultiStepForm must be carried out manually for this step, then we can call next().
  const submitMedia = () => {
    handleMedia();
    next();
  };

  return (
    <div className="flex flex-row items-center w-full h-full justify-evenly bg-dark-background">
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
            </label>
            <input {...getInputProps()} />
            <p className="pt-12 pb-6 text-dark-primary">
              Drag &amp; drop your file here, or <u>click to select a file</u>.
            </p>
            <p className="text-sm italic text-center text-dark-secondary">
              Accepted file types: image, audio, video, or text.
              <br />
              Max file size: 100MB.
            </p>
          </div>
          {acceptedFiles.length > 0 ? (
            <div className="flex justify-end py-2 border-b border-l border-r border-dark-border">
              <div className="mr-12 border shadow-md border-dark-border w-min">
                <Button
                  isMain={false}
                  text={"Next"}
                  // className="px-4 py-2 m-3 text-base font-semibold border shadow-md bg-dark-background place-self-end hover:bg-green-100 hover:cursor-pointer"
                  onClick={submitMedia}
                />
              </div>
            </div>
          ) : (
            ""
          )}
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
