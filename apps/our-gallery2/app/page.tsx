import Image from "next/image";
import styles from "./page.module.css";

import { headers } from "next/headers";

async function getUser() {
  const headersInstance = headers();
  console.log({ ...headersInstance.entries() });
  const host = headersInstance.get("host");
  // headersInstance.forEach((v, k, p) => {
  //   console.log({ v, k, p });
  // });
  // const authorization = headersInstance.get('authorization')
  // Forward the authorization header
  // const res = await fetch('...', {
  //    headers: { authorization }
  // })
  // return res.json()
}

export default async function Home() {
  const user = await getUser();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/page.tsx</code>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
