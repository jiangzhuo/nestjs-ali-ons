import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface OnsModuleOptions {
  httpclient: any;
  logger?: any;
  // isBroadcast?:boolean,
  accessKeyId: string;
  accessKeySecret: string;
  producerGroup?: string;
  consumerGroup?: string;
  // onsAddr?: string
}

export interface OnsModuleConfigs {
  topic: string;
  tags: string;
  type: 'producer' | 'consumer';
}

export interface OnsOptionsFactory {
  createOnsOptions(): Promise<OnsModuleOptions> | OnsModuleOptions;
}

export interface OnsModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<OnsOptionsFactory>;
  useClass?: Type<OnsOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<OnsModuleOptions> | OnsModuleOptions;
  inject?: any[];
}
