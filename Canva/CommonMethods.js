// ------------------------------- COMMON METHODS FOR VALIDATION ------------------------------- //

const isValidTimestamp = (
  sentAtSeconds,
  receivedAtSeconds,
  leniencyInSeconds = 300
) => {
  return (
    Math.abs(Number(sentAtSeconds) - Number(receivedAtSeconds)) <
    Number(leniencyInSeconds)
  );
};

const getPathForSignatureVerification = (input) => {
  const paths = [
    "/configuration",
    "/configuration/delete",
    "/content/resources/find",
    "/editing/image/process",
    "/editing/image/process/get",
    "/publish/resources/find",
    "/publish/resources/get",
    "/publish/resources/upload",
  ];

  return paths.find((path) => input.endsWith(path));
};

const calculateSignature = (secret, message) => {
  // Decode the client secret
  const key = Buffer.from(secret, "base64");

  // Calculate the signature

  return createHmac("sha256", key).update(message).digest("hex");
};

// ------------------------------- COMMON METHODS FOR VALIDATION ------------------------------- //

module.exports = {
  isValidTimestamp,
  getPathForSignatureVerification,
  calculateSignature,
};
