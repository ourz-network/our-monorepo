import { Box, Text } from "degene-sais-quoi";
import { useENSAddress } from "@ourz/our-hooks";
import { useContext } from "react";
import { MediaContext } from "../context/MediaContext";
import type { RecipientShortFragment } from "@ourz/our-hooks/dist/graph-queries/ourz-graph-types";

const SplitTable = ({
  recipients,
  customLink,
}: {
  recipients: RecipientShortFragment[];
  customLink?: string;
}): JSX.Element => {
  const { networkId } = useContext(MediaContext);
  return (
    <Box>
      <table className="">
        <thead>
          <tr>
            <th className="">
              <Text variant="label">Address</Text>
            </th>
            <th className="">
              <Text variant="label">Name</Text>
            </th>
            <th className="">
              <Text variant="label">Role</Text>
            </th>
            <th className="">
              <Text variant="label">Share</Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {recipients?.map((recipient) => {
            const { data } = useENSAddress(recipient.id);
            return (
              <tr key={`${recipient.user.id}`}>
                <td className="">
                  <Text variant="base">{data ?? recipient.id}</Text>
                </td>
                <td className="">
                  {/* <Link href={`/${networkId}/profile/${recipient.user.id}`} passHref>
                    <Text variant="base">{recipient.name}</Text>
                  </Link> */}

                  {/* <p className="text-xs italic cursor-pointer hover:underline">
                    <Link href={`https://etherscan.io/address/${recipient.user.id}`}>
                    {ens?.toString() ?? recipient.user.id.toString()}
                    </Link>
                  </p> */}
                </td>
                <td className="">{recipient.role}</td>
                <td className="">
                  {Number(
                    Number(recipient.shares).toLocaleString("en", {
                      useGrouping: false,
                      minimumFractionDigits: 0,
                    })
                  )}
                  %{/* {Number(recipient.shares?.toString()).toFixed(2)}% */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Box>
  );
};

export default SplitTable;
