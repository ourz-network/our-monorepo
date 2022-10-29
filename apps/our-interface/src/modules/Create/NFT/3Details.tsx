import Button from "@/components/Button";
import { MintForm } from "@/utils/CreateModule";

const MintDetails = ({
  mintForm,
  handleChange,
  setBidShare,
  setPublicMint,
  thumbs,
  next,
  back,
}: {
  mintForm: MintForm;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setBidShare: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setPublicMint: (event: React.ChangeEvent<HTMLInputElement>) => void;
  thumbs: JSX.Element[];
  next: () => void;
  back: () => void;
}): JSX.Element => {
  const handleBidShare = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBidShare(Number(parseFloat(event.target.value).toFixed(2)));
  };

  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full max-h-90vh md:flex-row bg-dark-background">
      <div className="flex flex-col border border-dark-border" id="details">
        <form>
          <div className="flex flex-col px-16 py-8 border-b border-dark-border text-dark-primary">
            <p>
              <input
                className="visible mb-8 outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                type="text"
                id="title"
                name="name"
                placeholder="Enter Title"
                value={mintForm.metadata.name}
                onChange={handleChange}
                aria-label="title"
              />
            </p>
            {mintForm.mintKind === "Edition" && (
              <>
                <p>
                  <input
                    className="visible mb-8 outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                    type="text"
                    id="symbol"
                    name="symbol"
                    placeholder="Enter Symbol (XMPL)"
                    maxLength={4}
                    value={mintForm.metadata.symbol}
                    onChange={handleChange}
                    aria-label="symbol"
                  />
                </p>
                <p>
                  <input
                    className="visible mb-8 outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                    type="number"
                    id="edition size"
                    name="editionSize"
                    placeholder="Max Supply"
                    value={mintForm.metadata.editionSize}
                    onChange={handleChange}
                    aria-label="Edition Size"
                  />
                </p>
                <p>
                  <input
                    className="visible mb-8 outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                    type="number"
                    id="symbol"
                    name="salePrice"
                    placeholder="Price in ETH, ex: 0.1"
                    value={mintForm.metadata.salePrice}
                    onChange={handleChange}
                    aria-label="Sale Price"
                  />
                  If price is 0, minting will be paused.
                </p>
                <p>
                  <input
                    className="visible mb-8 outline-none bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                    type="checkbox"
                    id="Allow Public Mint"
                    name="publicMint"
                    placeholder="Max Supply"
                    value={mintForm.metadata.publicMint}
                    onChange={setPublicMint}
                    aria-label="Allow Public Mint"
                  />
                  Check this box if you want anyone to be able to mint.
                  <br />
                  Uncheck if you&apos;d like to use a whitelist.
                </p>
              </>
            )}
            <p>
              <textarea
                className="px-3 pt-2 pb-4 mb-8 w-full h-auto border border-dark-border bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                id="description"
                name="description"
                placeholder="Enter Description"
                value={mintForm.metadata.description}
                onChange={handleChange}
                aria-label="description"
              />
            </p>
            <div className="text-center">
              <div className="flex visible flex-col mx-auto mt-2 w-min">
                Creator Royalty:
                <div className="flex">
                  <input
                    className="w-16 outline-none bg-dark-background focus:outline-none focus:border-transparent"
                    type="number"
                    placeholder="10.00"
                    id="creatorBidShare"
                    name="creatorBidShare"
                    defaultValue={mintForm.creatorBidShare}
                    onBlur={handleBidShare}
                    aria-label="roaylty percentage"
                  />
                  <span className="inline-flex items-center px-3 text-sm border text-dark-secondary border-dark-border md bg-dark-background">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between py-2 mx-12">
            <Button isMain={false} text="Back" onClick={back} />
            <Button isMain={false} text="Next" onClick={next} />
          </div>
        </form>
      </div>
      <div className="flex flex-col max-w-1/2" id="preview">
        <p className="pb-2 text-center text-dark-primary">Preview</p>
        <div className="flex flex-col items-center p-5 border border-dark-border min-h-preview min-w-preview text-dark-secondary">
          {thumbs}
          <p className="text-xs italic text-center text-dark-primary">
            {mintForm.metadata.name}
            <br />
            {mintForm.metadata.description}
            <br />
            {mintForm.metadata.mimeType ?? ""}
            {mintForm.mintKind === "Edition" && (
              <>
                <br />
                {mintForm.metadata.symbol}
                <br />
                {mintForm.metadata.editionSize}
                <br />
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MintDetails;
