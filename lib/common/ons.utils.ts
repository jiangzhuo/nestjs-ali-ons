export function getConsumerToken(topic: string, tags: string) {
  console.log(`${topic}|${tags}|Consumer`);
  return `${topic}|${tags}|Consumer`;
}

export function getProducerToken(topic: string, tags: string) {
  console.log(`${topic}|${tags}|Producer`);
  return `${topic}|${tags}|Producer`;
}
