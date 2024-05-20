import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbConfig } from 'src/globals/interfaces/enums';
import { Todo } from 'src/todo/entities/todo.entity';
import { DataSourceOptions } from 'typeorm';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>(dbConfig.host),
  port: +configService.get<number>(dbConfig.port),
  username: configService.get<string>(dbConfig.username),
  password: configService.get<string>(dbConfig.password),
  database: configService.get<string>(dbConfig.name),
  entities: [Todo],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};

export const typeOrmDbOptionsFactory: (
  ...args: any[]
) => TypeOrmModuleOptions = (service: ConfigService) => ({
  type: 'postgres',
  host: service.get<string>(dbConfig.host),
  port: service.get<number>(dbConfig.port),
  username: service.get<string>(dbConfig.username),
  password: service.get<string>(dbConfig.password),
  database: service.get<string>(dbConfig.name),
  entities: [Todo],
});
