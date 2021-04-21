import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCartItemInput, CreateCartItemOutput } from './dtos/create-cartItem.dto';
import { DeleteCartItemsInput, DeleteCartItemsOutput } from './dtos/delete-cartItems.dto';
import { GetCartItemsOutput } from './dtos/get-cartItems.dto';
import { UpdateCartItemInput, UpdateCartItemOutput } from './dtos/update-cartItem.dto';
import { Cart, Item } from './entities/cart.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Cart) private readonly carts: Repository<Cart>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Menu) private readonly menus: Repository<Menu>,
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

      if(!user.cartId) {
        console.log('// 카트 처음 생성한 경우')
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

        await this.carts.save(cart)
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: '장바구니 담기에 실패했습니다.',
      };
    }
  }

  async updateCartItem(
    cartId: number,
    { menuId, qty }: UpdateCartItemInput
  ): Promise<UpdateCartItemOutput> {
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
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: '수량 변경을 실패했습니다.',
      }; 
    }
  }

  async deleteCartItems(
    user: User,
    { menuIds }: DeleteCartItemsInput
  ): Promise<DeleteCartItemsOutput> {
    try {
      const cart = await this.carts.findOne({ id: user.cartId });

      const cartItems = cart.items.filter(item => {
        return menuIds.indexOf(item.menuId) == -1;
      });

      if(cartItems.length) {
        // 카트 아이템이 남아있는 경우 기존 카트 업데이트
        await this.carts.save({ ...cart, items: cartItems });
      } else {
        // 카트 아이템이 남아있지 않은 경우 카트 삭제
        await this.carts.delete({ id: user.cartId });

        // 유저 cartId null
        await this.users.save({
          ...user,
          cart: null
        })
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: '장바구니 아이템 삭제를 실패했습니다.',
      }; 
    }
  }
}


