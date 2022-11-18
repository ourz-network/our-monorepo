import { useContext, useEffect, useState } from "react";
import { SubdomainContext } from "../context/SubdomainContext";
import { getAddressFromENS } from "../utils/ethers";
import { Button } from "degene-sais-quoi";
import Form from "./Form";
import { IconWallet, IconLockClosed, IconCog } from "degene-sais-quoi";
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

// theme={{
//   walletOption: css`
//     color: #000 !important;
//     position: relative;
//     width: 100%;
//     padding: 20px;
//     margin-bottom: 20px;
//     cursor: pointer;
//     &:last-child {
//       margin-bottom: 0;
//     }
//   `,
// }}
export const Wallet = () => {
  const { subdomain, domainAddress, userConfig } = useContext(SubdomainContext);
  const { address, connector, isConnected } = useAccount();
  const [isOwner, setIsOwner] = useState(domainAddress === address);
  const [showForm, setShowForm] = useState(false);
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div
      // css={css`
      //   display: flex;
      // `}
      >
        {/* {/* <Button shape="circle" variant="transparent" onClick={() => buttonAction()}>
          {actionText === "Connect Wallet" ? <IconWallet /> : <IconLockClosed />}
        </Button> */}
        {isOwner && (
          <Button shape="circle" variant="transparent" onClick={() => setShowForm(() => true)}>
            <IconCog />
          </Button>
        )}

        {connectors.map((connector) => {
          if (isConnected) {
            return (
              <div>
                <img src={ensAvatar} alt="ENS Avatar" />
                <div>{ensName ? `${ensName} (${address})` : address}</div>
                <div>Connected to {connector.name}</div>
                <button onClick={() => disconnect()}>Disconnect</button>
              </div>
            );
          }

          return (
            <button
              className="p-2 text-xs border"
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => {
                // setShowDialog(false);
                connect({ connector });
              }}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
            </button>
          );
        })}
      </div>
      {showForm && (
        <Form
          subdomain={subdomain}
          address={address}
          userConfig={userConfig}
          setShowForm={setShowForm}
        />
      )}
    </>
  );
};
