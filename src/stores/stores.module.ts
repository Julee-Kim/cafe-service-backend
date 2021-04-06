import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gugun } from './entities/gugun.entity';
import { Sido } from './entities/sido.entity';
import { Store } from './entities/store.entity';
import { StoresResolver } from './stores.resolver';
import { StoresService } from './stores.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Sido, Gugun])],
  providers: [StoresResolver, StoresService],
})
export class StoresModule {}
