const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const deterministicPartitionKey = (event) => {
  let candidate;

  candidate = validateEvent(event, candidate)
  candidate = validateType(candidate)
  candidate = validateLength(candidate)
  return candidate;
};

const validateEvent = (event, candidate) => {
  if (event) {
    if (event.partitionKey) {
      return event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      return crypto.createHash("sha3-512").update(data).digest("hex");
    }
  } else {
    return candidate
  }
}

const validateType = (candidate) => {
  if (candidate) {
    if (typeof candidate !== "string") {
      return JSON.stringify(candidate);
    } else {
      return candidate
    }
  } else {
    return TRIVIAL_PARTITION_KEY;
  }
}
const validateLength = (candidate) => {
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(candidate).digest("hex");
  } else {
    return candidate
  }
}

module.exports = { deterministicPartitionKey, validateEvent, validateType, validateLength } 