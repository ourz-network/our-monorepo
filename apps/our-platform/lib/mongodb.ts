/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error('Mongo URI missing')
}

if (process.env.NODE_ENV === 'development') {
  /* @ts-ignore */
  if (!global._mongoClientPromise) {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    client = new MongoClient(uri as string)
    /* @ts-ignore */
    global._mongoClientPromise = client.connect()
  }
  /* @ts-ignore */
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri as string)
  clientPromise = client.connect()
}

export default clientPromise
