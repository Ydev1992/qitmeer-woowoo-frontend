import { createThirdwebClient } from "thirdweb";
import { ConnectButton, ConnectEmbed } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const wallets = [
  createWallet("com.okex.wallet"), // Add your wallet in wallet list
  // add other wallets...
];

const client = createThirdwebClient({ clientId: "Enthusiast" });

function OKXConnectButton() {
  return (
    <div>
      {/* Use ConnectButton */}
      <ConnectButton client={client} wallets={wallets} />

      {/* Or Use ConnectEmbed */}
      <ConnectEmbed client={client} wallets={wallets} />
    </div>
  );
}

export default OKXConnectButton;
