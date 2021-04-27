import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { Payment } from './entities/payment.entity';
import { CartsResolver, PaymentsResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Menu, Payment])],
  providers: [CartsResolver, PaymentsResolver, OrdersService]
})
export class OrdersModule {}
