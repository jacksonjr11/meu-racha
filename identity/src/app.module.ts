import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './application/person/person.module';
import { DatabaseModule } from './infra/database/database.module';
import { UserModule } from './application/user/user.module';
import { AuthModule } from './application/auth/auth.module';
import { AuthGuard } from './application/auth/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, PersonModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
