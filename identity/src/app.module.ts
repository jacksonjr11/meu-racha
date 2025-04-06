import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './application/person/person.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [DatabaseModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
