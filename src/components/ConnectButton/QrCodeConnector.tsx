import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import QRCode from "qrcode.react";

const qrConnector = new WalletConnect({
  bridge: "https://app.uniswap.org/", // Required
});

if (!qrConnector.connected) {
  // Create a new session
  qrConnector.createSession();

  // Display QR Code modal
  // QRCodeModal.open(qrConnector.uri, () => {
  //   console.log("QR Code Modal closed");
  // });
}

qrConnector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Close QR Code Modal
  QRCodeModal.close();

  // Get provided accounts and chainId
  const { accounts } = payload.params[0];
});

qrConnector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get updated accounts and chainId
  const { accounts } = payload.params[0];
});

qrConnector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }
});

const QrCodeConnector = () => {
  return (
    <div>
      <QRCode value={qrConnector.uri} size={100} />
    </div>
  );
};

export default QrCodeConnector;
