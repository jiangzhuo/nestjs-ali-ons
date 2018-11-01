import { Inject, Injectable } from '@nestjs/common';
import { Consumer, Producer, Message } from 'ali-ons';
import { Observable } from 'rxjs';
import {
  ONS_PRODUCER_CLIENT,
  ONS_CONSUMER_CLIENT
} from './ons-client.provider';

@Injectable()
export class OnsService {
  constructor(
    @Inject(ONS_PRODUCER_CLIENT) private readonly producerClient: Producer,
    @Inject(ONS_CONSUMER_CLIENT) private readonly consumerClient: Consumer
  ) {}

  getProducer(): Producer {
    return this.producerClient;
  }

  getConsumer(): Consumer {
    return this.consumerClient;
  }

  async send(msg: Message): Promise<Observable<any>> {
    return this.producerClient.send(msg);
  }

  subscribe(topic: string, subExpression: string, handler): Observable<any> {
    return this.consumerClient.subscribe(topic, subExpression, handler);
  }
}
