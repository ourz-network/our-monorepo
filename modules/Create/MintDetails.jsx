import Button from "@/components/Button";

const MintDetails = (props) => {
  const { data, handleChange, thumbs, next, back } = props;

  return (
    <div className="flex flex-row justify-evenly items-center w-full h-full bg-dark-background">
      <div className="flex flex-col border lg:-mt-32 border-dark-border" id="details">
        <form>
          <div className="flex flex-col px-16 py-8 border-b border-dark-border text-dark-primary">
            <p>
              <label className="hidden" htmlFor="Title">
                Title:
                <input
                  className="mb-8 outline-none text-primary bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter Title"
                  value={data.title}
                  onChange={handleChange}
                />
              </label>
            </p>
            <p>
              <label className="hidden" htmlFor="description">
                Description:
                <input
                  className="px-3 pt-2 pb-4 mb-8 w-full h-auto border border-dark-border text-primary bg-dark-background focus:outline-none focus:border-dark-secondary focus:ring-transparent"
                  type="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter Description"
                  value={data.description}
                  onChange={handleChange}
                />
              </label>
            </p>
            <p className="text-center">
              <label className="hidden" htmlFor="creatorBidShare">
                Royalty Percentage
                <div className="flex mx-auto mt-2 w-min">
                  <input
                    className="w-14 outline-none bg-dark-background focus:outline-none focus:border-transparent"
                    type="number"
                    placeholder="%"
                    id="creatorBidShare"
                    name="creatorBidShare"
                    value={data.creatorBidShare}
                    onChange={handleChange}
                  />
                  <span className="inline-flex items-center px-3 text-sm border text-dark-secondary border-dark-border md bg-dark-background">
                    %
                  </span>
                </div>
              </label>
            </p>
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
            {data.title}
            <br />
            {data.description}
            <br />
            {data.mediaKind}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MintDetails;
