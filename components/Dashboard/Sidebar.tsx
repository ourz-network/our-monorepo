import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import { OurProxy, SplitRecipient } from "@/modules/subgraphs/ourz/types";
import Table from "@/components/Charts/Table";
import { toTrimmedAddress } from "@/ethereum/utils";

const Sidebar = ({ split, showFull }: { split: OurProxy; showFull: boolean }): JSX.Element => {
  const [recipientInfo, setRecipientInfo] = useState<SplitRecipient[] | undefined>();

  useEffect(() => {
    setRecipientInfo(split?.splitRecipients);
  }, [split]);

  return (
    <div className="flex min-h-screen max-h-screen w-preview max-w-preview min-w-preview bg-dark-accent">
      {showFull && (
        <div className="mt-8 w-full">
          <div className="text-center text-dark-primary">
            <div id="info" className="mb-8 space-y-2">
              {split.nickname}
              {split?.role && `Your role: ${role}`}
            </div>
            <div id="recipients" className="mx-2 w-preview">
              <Table recipients={recipientInfo} />
            </div>
            <div id="details">
              {ethers.utils.formatEther(split.ETH.toString() || 0)} ETH unclaimed in Split
              <div id="owners" className="my-2">
                <p className="font-bold">Owners:</p>
                {split?.proxyOwners.map((owner) => (
                  <div className="cursor-pointer hover:underline" key={owner.id}>
                    <Link href={`/profile/${owner.id}`} passHref>
                      {toTrimmedAddress(owner.id)}
                    </Link>
                  </div>
                ))}
                <p className="mt-2 font-bold">Creator:</p>
                <div className="cursor-pointer hover:underline" key={split.creator.id}>
                  <Link href={`/profile/${split.creator.id}`} passHref>
                    {toTrimmedAddress(split.creator.id)}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
