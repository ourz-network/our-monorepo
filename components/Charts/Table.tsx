import Link from "next/link";
import { toTrimmedAddress } from "@/ethereum/utils";
import { SplitRecipient } from "@/modules/subgraphs/ourz/types";

const Table = ({ recipients }: { recipients: SplitRecipient[] }): JSX.Element => (
  <>
    <div className="p-2 mb-2 border border-dark-border">
      <div className="text-xl text-center text-dark-primary">{`${recipients?.length} Split Recipients`}</div>
      <table className="flex-col mt-2 w-auto table-fixed">
        <thead>
          <tr>
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
            <tr key={split.id} className={i % 2 === 0 ? `bg-dark-background` : ``}>
              {/* <td className="w-3/12 text-center overflow-ellipsis border text-dark-primary border-dark-border hover:underline">
                <Link href={`/profile/${split.user.id}`} className="cursor-pointer">
                  {toTrimmedAddress(split.user.id)}
                </Link>
              </td> */}
              <td className="text-center border cursor-pointer text-dark-primary border-dark-border hover:underline">
                <Link href={`/profile/${split.user.id}`}>{split.name}</Link>
              </td>
              <td className="text-center border text-dark-primary border-dark-border">
                {split.role}
              </td>
              <td className="text-center border text-dark-primary border-dark-border">
                {Number(split.shares?.toString()).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export default Table;
