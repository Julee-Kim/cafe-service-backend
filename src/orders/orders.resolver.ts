import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Allow } from 'src/auth/allow.decorator';
import { AuthUser } from 'src/auth/authUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateCartItemInput, CreateCartItemOutput } from './dtos/create-cartItem.dto';
import { CreateCartItemsInput, CreateCartItemsOutput } from './dtos/create-cartItems.dto';
import { DeleteCartItemsInput, DeleteCartItemsOutput } from './dtos/delete-cartItems.dto';
import { GetCartItemsOutput } from './dtos/get-cartItems.dto';
import { UpdateCartItemQtyInput, UpdateCartItemQtyOutput } from './dtos/update-cartItem-qty.dto';
import { UpdateCartItemsInput, UpdateCartItemsOutput } from './dtos/update-cartItems.dto';
import { Cart } from './entities/cart.entity';
import { OrdersService } from './orders.service';

@Resolver(of => Cart)
export class CartsResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(returns => GetCartItemsOutput)
  @Allow('LoggedIn')
  getCartItems(
    @AuthUser() authUser: User
  ): Promise<GetCartItemsOutput> {
    return this.ordersService.getCartItems(authUser.cartId);
  }

  @Mutation(returns => CreateCartItemOutput)
  @Allow('LoggedIn')
  createCartItem(
    @AuthUser() authUser: User,
    @Args('input') createCartItemInput: CreateCartItemInput
  ): Promise<CreateCartItemOutput> {
    return this.ordersService.createCartItem(authUser, createCartItemInput);
  }

  @Mutation(returns => CreateCartItemsOutput)
  @Allow('LoggedIn')
  createCartItems(
    @AuthUser() authUser: User,
    @Args('input') createCartItemsInput: CreateCartItemsInput
  ): Promise<CreateCartItemsOutput> {
    return this.ordersService.createCartItems(authUser, createCartItemsInput);
  }

  @Mutation(returns => UpdateCartItemQtyOutput)
  @Allow('LoggedIn')
  updateCartItemQty(
    @AuthUser() authUser: User,
    @Args('input') updateCartItemQtyInput: UpdateCartItemQtyInput
  ): Promise<UpdateCartItemQtyOutput> {
    return this.ordersService.updateCartItemQty(authUser.cartId, updateCartItemQtyInput);
  }

  @Mutation(returns => UpdateCartItemsOutput)
  @Allow('LoggedIn')
  updateCartItems(
    @AuthUser() authUser: User,
    @Args('input') udpateCartItemsInput: UpdateCartItemsInput
  ): Promise<UpdateCartItemsOutput> {
    console.log('resolver in')
    return this.ordersService.updateCartItems(authUser.cartId, udpateCartItemsInput);
  }

  @Mutation(returns => DeleteCartItemsOutput)
  @Allow('LoggedIn')
  deleteCartItems(
    @AuthUser() authUser: User,
    @Args('input') deleteCartItemInput: DeleteCartItemsInput
  ): Promise<DeleteCartItemsOutput> {
    return this.ordersService.deleteCartItems(authUser, deleteCartItemInput);
  }
}
