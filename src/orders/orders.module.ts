import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Menu])],
  providers: [OrdersResolver, OrdersService]
})
export class OrdersModule {}
