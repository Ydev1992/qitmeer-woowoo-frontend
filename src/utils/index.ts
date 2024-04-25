export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

const IMPOSSIBLE_ERROR = "Unable to perform the operation. Reload the application and try again.";

const TRANSACTION_REPLACED_ERROR =
  "Transaction was replaced by another. Reload the application and find the transaction in the history page.";

export const handleWalletError = (
  error: any,
  showError: (msg: string) => void,
  symbol = "Meer"
) => {
  console.log(error)
  if (error?.message && error?.message.length <= 120) {
    if (error?.data?.message?.includes("insufficient")) {
      showError(`Not enough ${symbol}`);
    } else {
      showError(error?.data?.message ?? error.message);
    }
  } else if (error?.message && error?.message.toLowerCase().includes("transaction was replaced")) {
    showError(TRANSACTION_REPLACED_ERROR);
  } else if (error?.data?.message) {
    showError(error?.data?.message);
  } else if (error?.message && error?.message.length > 120) {
    showError(
      (error.reason.split(":").splice(-1)[0] ?? error.message.split("(")[0]).replace(
        "Sending a transaction requires a signer",
        "No wallet connected"
      ).replace(
          "ERC20",
          symbol
      )
    );
  } else {
    showError(IMPOSSIBLE_ERROR);
  }
};

export function shortenString(value: string, cap: number) {
  if (!value) return "";
  return value.length > cap ? value.substring(0, cap) + "..." : value;
}


