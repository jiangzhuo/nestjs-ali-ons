import { DynamicModule, Module, Provider } from '@nestjs/common';
import { createOnsClients } from './ons-client.provider';
import { ONS_MODULE_OPTIONS } from './ons.constants';
import {
  OnsModuleAsyncOptions,
  OnsModuleOptions,
  OnsOptionsFactory,
  OnsModuleConfigs
} from './interfaces/ons-module-options.interface';

@Module({})
export class OnsModule {
  static register(
    options: OnsModuleOptions,
    configs: OnsModuleConfigs[]
  ): DynamicModule {
    const onsClients = createOnsClients(configs);
    const providers = onsClients.concat({
      provide: ONS_MODULE_OPTIONS,
      useValue: options
    });
    return {
      module: OnsModule,
      providers: providers,
      exports: providers
    };
  }

  static registerAsync(
    options: OnsModuleAsyncOptions,
    configs: OnsModuleConfigs[]
  ): DynamicModule {
    const onsClients = createOnsClients(configs);
    const providers = onsClients.concat(this.createAsyncProviders(options));
    return {
      module: OnsModule,
      imports: options.imports || [],
      providers: onsClients.concat(this.createAsyncProviders(options)),
      exports: providers
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
