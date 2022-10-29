import { useState, useEffect } from "react";
import { Recipient } from "@/utils/OurzSubgraph";
import { ChartData } from "../components/Charts/DetailedPie";

const useRecipients = ({
  recipients,
  secondaryRoyalty,
}: {
  recipients: Recipient[];
  secondaryRoyalty: number | undefined;
}) => {
  const [firstSale, setFirstSale] = useState<ChartData[] | null>(); // 100% of funds from sale are split
  const [secondarySales, setSecondarySales] = useState<ChartData[] | null>(); // only get x% of funds from sale

  useEffect(() => {
    if (recipients) {
      // create first sale chart data
      let newChartData = recipients.flatMap((recipient) => ({
        name: `${recipient.name || recipient.user.id}`,
        shares: Number(recipient.shares),
      }));
      setFirstSale(newChartData);

      if (secondaryRoyalty) {
        newChartData = newChartData.map((recipient) => ({
          name: recipient.name,
          shares: Number(recipient.shares) * Number((secondaryRoyalty / 100).toFixed(4)),
        }));
        newChartData.push({
          name: "Owner",
          shares: 100 - secondaryRoyalty,
        });

        setSecondarySales(newChartData);
      }
    }
  }, [recipients, secondaryRoyalty]);

  return { firstSale, secondarySales };
};

export default useRecipients;
