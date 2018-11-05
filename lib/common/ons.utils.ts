export function getConsumerToken(topic: string, tags: string) {
  return `${topic}|${tags}|Consumer`;
}

export function getProducerToken(topic: string, tags: string) {
  return `${topic}|${tags}|Producer`;
}
