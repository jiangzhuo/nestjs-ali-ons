import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  createOnsConsumerClient,
  createOnsProducerClient
} from './ons-client.provider';
import { ONS_MODULE_OPTIONS } from './ons.constants';
import { OnsService } from './ons.service';
import {
  OnsModuleAsyncOptions,
  OnsModuleOptions,
  OnsOptionsFactory
} from './interfaces/ons-module-options.interface';

@Module({
  providers: [OnsService],
  exports: [OnsService]
})
export class OnsModule {
  static register(options: OnsModuleOptions): DynamicModule {
    return {
      module: OnsModule,
      providers: [
        createOnsConsumerClient(),
        createOnsProducerClient(),
        { provide: ONS_MODULE_OPTIONS, useValue: options }
      ]
    };
  }

  static registerAsync(options: OnsModuleAsyncOptions): DynamicModule {
    return {
      module: OnsModule,
      imports: options.imports || [],
      providers: [
        createOnsConsumerClient(),
        createOnsProducerClient(),
        ...this.createAsyncProviders(options)
      ]
    };
  }

  private static createAsyncProviders(
    options: OnsModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: OnsModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: ONS_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: ONS_MODULE_OPTIONS,
      useFactory: async (optionsFactory: OnsOptionsFactory) =>
        await optionsFactory.createOnsOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
