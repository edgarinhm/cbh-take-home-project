const { deterministicPartitionKey, validateEvent, validateType, validateLength } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns event as hash when event pass to deterministicPartitionKey", () => {
    const event = { "edgar": "mejia" }
    const trivialKey = deterministicPartitionKey(event);
    const eventMock = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    expect(trivialKey).toBe(eventMock);
  });

  it("Returns event partition key pass to deterministicPartitionKey", () => {
    const partitionKeyMock = "hernan"
    const event = { "edgar": "mejia", "partitionKey": partitionKeyMock }
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(partitionKeyMock);
  });


});

describe("validations Event, Type, Length", () => {
  it("Returns event as hash", () => {
    const event = { "edgar": "mejia" }
    const trivialKey = validateEvent(event);
    const eventMock = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    expect(trivialKey).toBe(eventMock);
  });

  it("Returns event partition key", () => {
    const partitionKeyMock = "hernan"
    const event = { "edgar": "mejia", "partitionKey": partitionKeyMock }
    const trivialKey = validateEvent(event);
    expect(trivialKey).toBe(partitionKeyMock);
  });

  it("Returns candidate when no event provided", () => {
    const candidate = "candidate"
    let event;
    const trivialKey = validateEvent(event, candidate);
    expect(trivialKey).toBe(candidate);
  });

  it("Returns candidate as JSON object when type diff from string", () => {
    const candidate = { "candidate": "edgar" }
    const trivialKey = validateType(candidate);
    expect(trivialKey).toBe(JSON.stringify(candidate));
  });

  it("Returns '0' when candidate is not defined", () => {
    const candidate = "0"
    const trivialKey = validateType();
    expect(trivialKey).toBe(candidate);
  });

  it("Returns candidate hash when candidate length is greater than 256", () => {
    const candidate = "5ae8f97ede3b9ae9f4b496c125d45d34edf13ce2f9e29c1c085ae0f499820173b86d731c4ca453d2e119b4ff63d3afd3ed5fdb9753fe222ef300d4f465f522ea5ae8f97ede3b9ae9f4b496c125d45d34edf13ce2f9e29c1c085ae0f499820173b86d731c4ca453d2e119b4ff63d3afd3ed5fdb9753fe222ef300d4f465f522ea"
    const trivialKey = validateLength(candidate);
    expect(trivialKey).toHaveLength(256);
  });
});