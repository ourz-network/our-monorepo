import Link from "next/link";
import { toTrimmedAddress } from "@/ethereum/utils";

const Table = ({ recipients }) => {
  console.log(`table recipients:`, recipients);
  return (
    <>
      <div className="p-2 mb-2 border border-dark-border">
        <div className="text-xl text-center text-dark-primary">{`${recipients?.length} Split Recipients`}</div>
        <table className="w-full mt-2 table-fixed">
          <thead>
            <tr>
              <th className="w-3/12 font-normal text-center border text-dark-primary border-dark-border">
                Recipient
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
              <tr key={i} className={i % 2 == 0 ? `bg-dark-background` : ``}>
                <td className="w-3/12 text-center border text-dark-primary border-dark-border overflow-ellipsis hover:underline">
                  <Link href={`/profile/${split.user.id}`} className="cursor-pointer">
                    {toTrimmedAddress(split.user.id)}
                  </Link>
                </td>
                <td className="text-center border text-dark-primary border-dark-border">
                  {split.name}
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
};

export default Table;
