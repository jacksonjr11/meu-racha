import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'identity-db',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'identity',
      schema: 'application',
      entities: [__dirname + '/entity/*.entity{.js,.ts}'],
      migrations: [__dirname + '/migration/{.ts,*.js}'],
      migrationsRun: true,
    }),
  ],
})
export class DatabaseModule {}
