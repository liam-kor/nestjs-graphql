import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        JwtService,
      ],
    };
  }
}
