import Link from "next/link";
import useENS from "@/common/hooks/useENS";

const ENSAddress = ({ address }: { address: string }): JSX.Element => {
  const { addressOrENS } = useENS({ address });
  return (
    <>
      <Link
        href={`https://etherscan.io/address/${address}`}
        legacyBehavior
      >{`${addressOrENS}`}</Link>
    </>
  );
};
export default ENSAddress;
