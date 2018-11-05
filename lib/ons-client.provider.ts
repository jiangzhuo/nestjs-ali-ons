import { Consumer, Producer, Message } from 'ali-ons';
import { ONS_MODULE_OPTIONS } from './ons.constants';
import { OnsModuleOptions } from './interfaces';
import { getConsumerToken, getProducerToken } from './common/ons.utils';

export const createOnsClients = (
  configs: { topic: string; tags: string }[]
): any[] => {
  let clients = [];
  configs.forEach(config => {
    clients.push({
      provide: getProducerToken(config.topic, config.tags),
      useFactory: (options: OnsModuleOptions) => {
        let producer = new Producer(options);
        return new Proxy(producer, {
          get(target: any, p: PropertyKey, receiver: any): any {
            if (p === 'send') {
              const origSend = target[p];
              return async function(body) {
                const message = new Message(config.topic, config.tags, body);
                return origSend.apply(this, [message]);
              };
            } else {
              return target[p];
            }
          }
        });
      },
      inject: [ONS_MODULE_OPTIONS]
    });
    clients.push({
      provide: getConsumerToken(config.topic, config.tags),
      useFactory: (options: OnsModuleOptions) => {
        let consumer = new Consumer(options);
        return new Proxy(consumer, {
          get(target: any, p: PropertyKey, receiver: any): any {
            if (p === 'subscribe') {
              const origSend = target[p];
              return function(handler) {
                return origSend.apply(this, [
                  config.topic,
                  config.tags,
                  handler
                ]);
              };
            } else {
              return target[p];
            }
          }
        });
      },
      inject: [ONS_MODULE_OPTIONS]
    });
  });
  return clients;
};
