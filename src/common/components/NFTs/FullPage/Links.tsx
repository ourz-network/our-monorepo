import { useContext } from "react";
import FullPageContext from "./FullPageContext";

const Details = (): JSX.Element => {
  const { post } = useContext(FullPageContext);

  return (
    <div className="flex flex-col my-2 border border-dark-border">
      <p className="p-4 w-full text-xs border-b h-min tracking-2-wide border-dark-border">
        PROOF OF AUTHENTICITY
      </p>
      <a
        className="hover:underline hover:cursor"
        href={`https://etherscan.io/address/${post.editionAddress}#code`}
      >
        <p className="p-4 w-full text-base font-semibold border-b h-min border-dark-border">
          View on Etherscan.io
        </p>
      </a>
      <a className="hover:underline hover:cursor" href={post.contentURI}>
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
  );
};

export default Details;
