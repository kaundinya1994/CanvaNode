const {
  isValidTimestamp,
  getPathForSignatureVerification,
  calculateSignature,
} = require("./CommonMethods");

// ------------------------------- POST REQUEST VALIDATION ------------------------------- //

const isValidPostRequest = (secret, request) => {
  // Verify the timestamp
  const sentAtSeconds = request.header("X-Canva-Timestamp");
  const receivedAtSeconds = new Date().getTime() / 1000;

  if (!isValidTimestamp(sentAtSeconds, receivedAtSeconds)) {
    return false;
  }

  // Construct the message
  const version = "v1";
  const timestamp = request.header("X-Canva-Timestamp");
  const path = getPathForSignatureVerification(request.path);
  const body = JSON.stringify(request.body);
  const message = `${version}:${timestamp}:${path}:${body}`;

  // Calculate a signature
  const signature = calculateSignature(secret, message);

  
  // Reject requests with invalid signatures
  if (!request.header("X-Canva-Signatures").includes(signature)) {
    return false;
  }

  return true;
};

module.exports = isValidPostRequest;
// ------------------------------- POST REQUEST VALIDATION ------------------------------- //
