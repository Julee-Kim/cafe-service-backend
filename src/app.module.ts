import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as Joi from 'joi'; // 환경변수 유효성 검사
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusModule } from './menus/menus.module';
import { Menu } from './menus/entities/menu.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { StoresModule } from './stores/stores.module';
import { Store } from './stores/entities/store.entity';
import { Gugun } from './stores/entities/gugun.entity';
import { Sido } from './stores/entities/sido.entity';
import { OrdersModule } from './orders/orders.module';
import { Cart } from './orders/entities/cart.entity';
import { Payment } from './orders/entities/payment.entity';
console.log(process.env.NODE_ENV)
console.log(process.env.DB_PORT)
console.log(process.env.DB_DATABASE)
console.log(process.env.DB_USERNAME)
console.log(process.env.DB_PASSWORD)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'production', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
      entities: [Menu, User, Category, Sido, Gugun, Store, Cart, Payment],
    }),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: true,
      introspection: true,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    // JwtModule,
    AuthModule,
    MenusModule,
    UsersModule,
    CategoriesModule,
    StoresModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [JwtMiddleware],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.POST,
    });
  }
}
