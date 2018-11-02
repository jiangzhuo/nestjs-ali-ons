import { Inject } from '@nestjs/common';
import { getProducerToken, getConsumerToken } from './ons.utils';

export const InjectProducer = (topic: string, tags: string) =>
  Inject(getProducerToken(topic, tags));
export const InjectConsumer = (topic: string, tags: string) =>
  Inject(getConsumerToken(topic, tags));
