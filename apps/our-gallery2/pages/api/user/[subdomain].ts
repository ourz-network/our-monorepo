import { NextApiRequest, NextApiResponse } from "next/types";
import { ethers } from "ethers";
import { getAddressFromENS } from "../../../utils/ethers";
import clientPromise from "../../../db/client";

// ourz.xyz/api/user/ens

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { subdomain } = req.query;

  if (!subdomain) {
    res.status(403).json({ failed: true });
  }

  const client = await clientPromise;
  const collection = client.db("ourGallery").collection("ourGallery");

  switch (method) {
    case "GET":
      try {
        console.log("wow", subdomain);
        const userConfig = await collection.findOne({ _id: `${subdomain}` });

        res.status(200).json(userConfig);
      } catch (error) {
        console.log(error);
        return res.status(404).json({ failed: true });
      }

      break;

    case "POST":
      const { userConfig, signedMessage } = JSON.parse(req.body);

      const signerAddress = ethers.utils.verifyMessage(
        JSON.stringify(userConfig),
        signedMessage
      );
      const subdomainAddress = await getAddressFromENS(subdomain);

      if (signerAddress === subdomainAddress) {
        const userExists = await collection.find({ _id: `${subdomain}` });

        if (userExists) {
          const updateDocument = await collection.replaceOne(
            { _id: `${subdomain}` },
            { _id: `${subdomain}`, ...userConfig }
          );

          res.status(200).json("Update Successful");
        } else {
          const newDocument = await collection.insertOne({
            _id: `${subdomain}`,
            ...userConfig,
          });

          res.status(201).json("Creation Successful");
        }
      } else {
        res.status(403).json(`Failed. Signer does not own ${subdomain}.eth`);
      }

      break;

    default:
      return res.status(404).json({ failed: true });
  }
};
