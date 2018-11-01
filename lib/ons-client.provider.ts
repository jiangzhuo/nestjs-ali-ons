import { Consumer, Producer } from 'ali-ons';
import { ONS_MODULE_OPTIONS } from './ons.constants';
import { OnsModuleOptions } from './interfaces';

export const ONS_PRODUCER_CLIENT = 'ONS_PRODUCER_CLIENT';
export const ONS_CONSUMER_CLIENT = 'ONS_CONSUMER_CLIENT';

export const createOnsProducerClient = () => ({
  provide: ONS_PRODUCER_CLIENT,
  useFactory: (options: OnsModuleOptions) => {
    return new Producer(options);
  },
  inject: [ONS_MODULE_OPTIONS]
});

export const createOnsConsumerClient = () => ({
  provide: ONS_CONSUMER_CLIENT,
  useFactory: (options: OnsModuleOptions) => {
    return new Consumer(options);
  },
  inject: [ONS_MODULE_OPTIONS]
});
