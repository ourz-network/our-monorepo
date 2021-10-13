import Button from "@/components/Button";
import { MintForm } from "@/utils/CreateModule";

const MintDetails = ({
  mintForm,
  handleChange,
  thumbs,
  next,
  back,
}: {
  mintForm: MintForm;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  thumbs: JSX.Element[];
  next: () => void;
  back: () => void;
}): JSX.Element => (
  <div className="flex flex-col justify-evenly items-center w-full h-full md:flex-row bg-dark-background">
    <div className="flex flex-col border lg:-mt-32 border-dark-border" id="details">
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
                  id="symbol"
                  name="Edition Size"
                  placeholder="Max Supply"
                  value={mintForm.metadata.editionSize}
                  onChange={handleChange}
                  aria-label="Edition Size"
                />
              </p>
            </>
          )}
          <p>
            <input
              className="px-3 pt-2 pb-4 mb-8 w-full h-auto border border-dark-border bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
              type="textarea"
              id="description"
              name="description"
              placeholder="Enter Description"
              value={mintForm.metadata.description}
              onChange={handleChange}
              aria-label="description"
            />
          </p>
          <div className="text-center">
            <label className="hidden" htmlFor="creatorBidShare">
              Royalty Percentage
              <div className="flex mx-auto mt-2 w-min">
                <input
                  className="w-14 outline-none bg-dark-background focus:outline-none focus:border-transparent"
                  type="number"
                  placeholder="%"
                  id="creatorBidShare"
                  name="creatorBidShare"
                  value={mintForm.creatorBidShare}
                  onChange={handleChange}
                />
                <span className="inline-flex items-center px-3 text-sm border text-dark-secondary border-dark-border md bg-dark-background">
                  %
                </span>
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-between py-2 mx-12">
          <Button isMain={false} text="Back" onClick={back} />
          <Button isMain={false} text="Next" onClick={next} />
        </div>
      </form>
    </div>
    <div className="flex flex-col lg:-mt-32" id="preview">
      <p className="pb-2 text-center text-dark-primary">Preview</p>
      <div className="flex flex-col p-5 border border-dark-border min-h-preview min-w-preview">
        {thumbs}
        <p className="pt-2 text-xs italic text-center text-dark-secondary">
          {mintForm.metadata.name}
          <br />
          {mintForm.metadata.description}
          <br />
          {mintForm.media.mimeType}
        </p>
      </div>
    </div>
  </div>
);

export default MintDetails;
