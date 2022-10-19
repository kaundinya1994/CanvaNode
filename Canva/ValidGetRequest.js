const { isValidTimestamp, calculateSignature } = require("./CommonMethods");

// ------------------------------- GET REQUEST VALIDATION ------------------------------- //

const isValidGetRequest = (secret, request) => {
  // Verify the timestamp
  const sentAtSeconds = request.query.time;
  const receivedAtSeconds = new Date().getTime() / 1000;

  console.log(
    "isValidTimestamp(sentAtSeconds, receivedAtSeconds) ",
    isValidTimestamp(sentAtSeconds, receivedAtSeconds)
  );
  if (!isValidTimestamp(sentAtSeconds, receivedAtSeconds)) {
    return false;
  }

  // Construct the message
  const version = "v1";
  const { time, user, brand, extensions, state } = request.query;
  const message = `${version}:${time}:${user}:${brand}:${extensions}:${state}`;

  console.log("message ", message);

  // Calculate a signature
  const signature = calculateSignature(secret, message);

  // Reject requests with invalid signatures
  if (!request.query.signatures.includes(signature)) {
    return false;
  }

  return true;
};
module.exports = isValidGetRequest;
// ------------------------------- GET REQUEST VALIDATION ------------------------------- //
