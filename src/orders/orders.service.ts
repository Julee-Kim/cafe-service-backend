import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCartItemInput, CreateCartItemOutput } from './dtos/create-cartItem.dto';
import { CreateCartItemsInput, CreateCartItemsOutput } from './dtos/create-cartItems.dto';
import { CreatePaymentInput } from './dtos/create-payment.dto';
import { DeleteCartItemsInput, DeleteCartItemsOutput } from './dtos/delete-cartItems.dto';
import { GetCartItemsOutput } from './dtos/get-cartItems.dto';
import { UpdateCartItemQtyInput, UpdateCartItemQtyOutput } from './dtos/update-cartItem-qty.dto';
import { UpdateCartItemsInput, UpdateCartItemsOutput } from './dtos/update-cartItems.dto';
import { Cart } from './entities/cart.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Cart) private readonly carts: Repository<Cart>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Menu) private readonly menus: Repository<Menu>,
    @InjectRepository(Payment) private readonly payments: Repository<Payment>,
  ) {}

  async getCartItems(cartId: number): Promise<GetCartItemsOutput> {
    try {
      // 유저 아이디로 장바구니 가져오기
      const cart = await this.carts.findOne({ id: cartId })

      return { success: true, results: cart.items }
    } catch (error) {
      return {
        success: false,
        error: '장바구니 가져오기에 실패했습니다.',
      };
    }
  }

  async createCartItem(
    user: User,
    {menuId, qty}: CreateCartItemInput
  ): Promise<CreateCartItemOutput> {
    try {
      const menu = await this.menus.findOne({ id: menuId });
      let resultCart = null;

      if(!user.cartId) {
        // 카트 처음 생성한 경우
        const items = [{
          menuId,
          qty,
          productName: menu.productName,
          img: menu.img,
          price: menu.price,
        }];

        // 카트 생성 및 저장
        const cart = await this.carts.save(
          this.carts.create({ user, items })
        );

        resultCart = cart;

        // 유저에 카트 아이디 저장
        await this.users.save({
          ...user,
          cart
        });
      } else {
        // 기존 카트가 있는 경우
        let cart = await this.carts.findOne({ id: user.cartId });
        let isNewItem = true;

        let i: number;
        for(i = 0; i < cart.items.length; i++) {
          const cartItem = cart.items[i];
          if(menuId === cartItem.menuId) {
            // 이미 메뉴가 담겨있는 경우 수량 증가
            cartItem.qty++;
            isNewItem = false;
          }
        }

        // 새로운 메뉴라면 cart.items에 추가
        if(isNewItem) {
          cart.items.push({
            menuId,
            qty,
            productName: menu.productName,
            img: menu.img,
            price: menu.price,
          })
        }

        resultCart = cart;

        await this.carts.save(cart)
      }
      
      return { success: true, cart: resultCart };
    } catch (error) {
      return {
        success: false,
        error: '장바구니 담기에 실패했습니다.',
      };
    }
  }

  async createCartItems(
    user: User,
    { items: newItems }: CreateCartItemsInput
  ): Promise<CreateCartItemsOutput> {
    try {
      let cartId: number;
      let resultCart: Cart;

      let i: number;
      for(i = 0; i < newItems.length; i++) {
        const newItem = newItems[i];

        // 메뉴아이디를 가지고 메뉴 정보 가져오기
        const menu = await this.menus.findOne({ id: newItem.menuId });

        if(!menu) {
          return {
            success: false,
            error: '존재하지 않는 메뉴는 장바구니에 추가할 수 없습니다.',
          };
        }

        // 장바구니에 새로 추가할 아이템
        const item = {
          menuId: newItem.menuId,
          qty: newItem.qty,
          productName: menu.productName,
          img: menu.img,
          price: menu.price,
        };

        if(!cartId) {
          // 카트 생성 및 아이템 저장
          const cart = await this.carts.save(
            this.carts.create({ user, items: [item] })
          );

          // 유저에 카트 아이디 저장
          await this.users.save({
            ...user,
            cart
          });

          // 카트 아이디 할당
          cartId = cart.id;
          // 리턴할 리턴할 카트 저장
          resultCart = cart;
        } else {
          // 카트 찾아서 아이템 저장
          const cart = await this.carts.findOne({ id: cartId });
          cart.items.push(item);
          await this.carts.save(cart);
          // 리턴할 카트 아이템에 카트 저장
          resultCart = cart;
        }
      }

      return { success: true, cart: resultCart };
    } catch (error) {
      return {
        success: false,
        error: '장바구니 담기에 실패했습니다.',
      };
    }
  }

  async updateCartItemQty(
    cartId: number,
    { menuId, qty }: UpdateCartItemQtyInput
  ): Promise<UpdateCartItemQtyOutput> {
    try {
      const cart = await this.carts.findOne({ id: cartId });

      let i: number;
      for(i = 0; i < cart.items.length; i++) {
        const cartItem = cart.items[i];
        if(cartItem.menuId === menuId) {
          cartItem.qty = qty
        }
      }

      await this.carts.save({ ...cart });
      console.log('cart => ', cart)
      return { success: true, cart };
    } catch (error) {
      return {
        success: false,
        error: '수량 변경을 실패했습니다.',
      }; 
    }
  }

  async updateCartItems(
    cartId: number,
    { items }: UpdateCartItemsInput
  ): Promise<UpdateCartItemsOutput> {
    try {
      const cart = await this.carts.findOne({ id: cartId });

      cart.items = items;

      await this.carts.save({ ...cart });
      return { success: true, cart };
    } catch (error) {
      return {
        success: false,
        error: '장바구니 업데이트에 실패했습니다.',
      }; 
    } 
  }

  async deleteCartItems(
    user: User,
    { menuIds }: DeleteCartItemsInput
  ): Promise<DeleteCartItemsOutput> {
    try {
      const cart = await this.carts.findOne({ id: user.cartId });
      let resultCart: Cart;

      const cartItems = cart.items.filter(item => {
        return menuIds.indexOf(item.menuId) == -1;
      });

      if(cartItems.length) {
        // 카트 아이템이 남아있는 경우 기존 카트 업데이트
        const afterSaveCart = await this.carts.save({ ...cart, items: cartItems });
        resultCart = afterSaveCart;
      } else {
        // 카트 아이템이 남아있지 않은 경우 카트 삭제
        await this.carts.delete({ id: user.cartId });

        // 유저 cartId null
        await this.users.save({
          ...user,
          cart: null
        })
      }

      return {
        success: true,
        ...(resultCart && {cart: resultCart})
      };
    } catch (error) {
      return {
        success: false,
        error: '장바구니 아이템 삭제를 실패했습니다.',
      }; 
    }
  }

  async createPayment(
    user: User,
    createPaymentInput: CreatePaymentInput
  ) {
    try {
      let i: number;
      
      const newPayment = this.payments.create({user, ...createPaymentInput});

      const payment = await this.payments.save(newPayment);
      console.log('new payment: ', payment)

      return { success: true, payment }
    } catch (error) {
      return {
        success: false,
        error: '결제정보를 저장하는데 실패했습니다.',
      }; 
    }
  }
}