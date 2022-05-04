import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { config } from './database/config';
import { UsersModule } from './modules/users.module';
import { ProfilesModule } from './modules/profiles.module';
import { PingGateway } from './providers/gateways/ping.gateway';
import { AuthGuard } from './providers/guards/auth.guard';
import { RolesGuard } from './providers/guards/roles.guard';
import { JwtService } from './providers/services/jwt.service';
import { RolesService } from './providers/services/roles.service';
import { UsersService } from './providers/services/users.service';
import { GuardUtil } from './providers/util/guard.util';
import { TypesService } from './providers/services/types.service';
import { TrainersService } from './providers/services/trainers.service';
import { CitiesService } from './providers/services/cities.service';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, ProfilesModule],
  controllers: [AppController],
  providers: [
    PingGateway,
    UsersService,
    RolesService,
    TypesService,
    TrainersService,
    CitiesService,
    JwtService,
    GuardUtil,
    { provide: APP_GUARD, useClass: AuthGuard }, // auth guard should come before roles guard
    { provide: APP_GUARD, useClass: RolesGuard }, // otherwise users won't be authenticated before roles check
  ],
})
export class AppModule {}
