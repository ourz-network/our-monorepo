import Link from "next/link";
import { Recipient } from "@/utils/OurzSubgraph";
import ENSAddress from "./ENSAddress";

const Table = ({ recipients }: { recipients: Recipient[] }): JSX.Element => (
  <>
    <div className="p-2 mb-2 border border-dark-border">
      <div className="text-xl text-center text-dark-primary">{`${recipients?.length} Split Recipients`}</div>
      <table className="flex-col mx-auto mt-2 w-auto table-fixed">
        <thead>
          <tr>
            <th className="w-3/12 font-normal text-center border text-dark-primary border-dark-border">
              Address
            </th>
            <th className="w-4/12 font-normal text-center border text-dark-primary border-dark-border">
              Name
            </th>
            <th className="w-3/12 font-normal text-center border text-dark-primary border-dark-border">
              Role
            </th>
            <th className="w-2/12 font-normal text-center border text-dark-primary border-dark-border">
              Share
            </th>
          </tr>
        </thead>
        <tbody>
          {recipients?.map((split, i) => (
            <tr key={`${split.user.id}`} className={i % 2 === 0 ? `bg-dark-background` : ``}>
              <td className="w-3/12 text-center overflow-ellipsis border text-dark-primary border-dark-border hover:underline">
                <ENSAddress address={split.user.id} />
              </td>
              <td className="text-center border text-dark-primary border-dark-border">
                <p className="cursor-pointer hover:underline">
                  <Link href={`/profile/${split.user.id}`} legacyBehavior>{split.name}</Link>
                </p>

                {/* <p className="text-xs italic cursor-pointer hover:underline">
                    <Link href={`https://etherscan.io/address/${split.user.id}`}>
                      {ens?.toString() ?? split.user.id.toString()}
                    </Link>
                  </p> */}
              </td>
              <td className="text-center border text-dark-primary border-dark-border">
                {split.role}
              </td>
              <td className="text-center border text-dark-primary border-dark-border">
                {Number(
                  split.shares?.toLocaleString("en", {
                    useGrouping: false,
                    minimumFractionDigits: 0,
                  })
                )}
                %{/* {Number(split.shares?.toString()).toFixed(2)}% */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
export default Table;
