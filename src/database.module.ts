import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        //TODO:!!! ?????
        // entities: [__dirname + '/../**/*.entity.ts'],
        synchronize: true,
        //TODO:!!! ?????
        autoLoadEntities: true,
        // //TODO:!!! Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
        // synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
