/* eslint-disable default-case */
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> => {
  const {
    query: { url },
    method,
  } = req;

  switch (method) {
    // GET ALL USERS. FOR GETSTATICPATHS SSG. https://masteringjs.io/tutorials/mongoose/find-all
    case "GET":
      try {
        await runMiddleware(url, res, cors);
      } catch (error) {
        res.status(500).send("Server Error");
      }
      break;
  }
};
