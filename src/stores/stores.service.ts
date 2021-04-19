import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
import { DeleteStoreInput, DeleteStoreOutput } from './dtos/delete-store.dto';
import { GetGugunsOutput } from './dtos/get-guguns.dto';
import { GetSidosOutput } from './dtos/get-sidos.dto';
import { GetStoreInput, GetStoreOutput } from './dtos/get-store.dto';
import { GetStoresInput, GetStoresOutput } from './dtos/get-stores.dto';
import { UpdateStoreInput, UpdateStoreOutput } from './dtos/update-store.dto';
import { Gugun } from './entities/gugun.entity';
import { Sido } from './entities/sido.entity';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private readonly stores: Repository<Store>,
    @InjectRepository(Sido) private readonly sidos: Repository<Sido>,
    @InjectRepository(Gugun) private readonly guguns: Repository<Gugun>,
  ) {}

  async getSidos(): Promise<GetSidosOutput> {
    try {
      const sidos = await this.sidos.find();

      return {
        success: true,
        results: sidos
      }
    } catch (error) {
      return {
        success: false,
        error: '시도를 가져오는데 실패했습니다.'
      }
    }
  }

  async getGuguns(): Promise<GetGugunsOutput> {
    try {
      const guguns = await this.guguns.find();

      return {
        success: true,
        results: guguns
      }
    } catch (error) {
      return {
        success: false,
        error: '구군을 가져오는데 실패했습니다.'
      }
    }
  }

  async getStores(getStoresInput: GetStoresInput): Promise<GetStoresOutput> {
    console.log(getStoresInput)
    try {
      const stores = await this.stores.find({...getStoresInput});
      console.log(stores)

      return {
        success: true,
        results: stores,
      };
    } catch (error) {
      return {
        success: false,
        error: '모든 매장을 가져오는데 실패했습니다.',
      };
    }
  }

  async getStore({ storeId }: GetStoreInput): Promise<GetStoreOutput> {
    try {
      const store = await this.stores.findOne(storeId);

      if (!store) {
        return {
          success: false,
          error: '매장을 찾을 수 없습니다.',
        };
      }

      return { success: true, store };
    } catch (error) {
      return {
        success: false,
        error: '매장을 가져오는데 실패했습니다.',
      };
    }
  }

  async createStore(
    createStoreInput: CreateStoreInput,
  ): Promise<CreateStoreOutput> {
    try {
      let newSido;
      let newGugun;

      // 1. 시/도(name)가 있는지 확인하고 없으면 저장
      const sido = await this.sidos.find({ name: createStoreInput.sido });
      if (!sido.length) {
        newSido = await this.sidos.save(
          this.sidos.create({ name: createStoreInput.sido }),
        );
      } else {
        newSido = sido[0];
      }

      // 2. 구/군(name)이 있는지 확인하고 없으면 저장
      const gugun = await this.guguns.find({ name: createStoreInput.gugun });
      if (!gugun.length) {
        newGugun = await this.guguns.save(
          this.guguns.create({
            name: createStoreInput.gugun,
            sidoId: newSido.id,
          }),
        );
        console.log('gugunId: ', newGugun.id);
      } else {
        newGugun = gugun[0];
      }

      // 3. 매장(name)이 있는지 확인하고 없으면 저장
      const store = await this.stores.find({ name: createStoreInput.name });
      if (!store.length) {
        const newSto = await this.stores.create({
          ...createStoreInput,
          sidoId: newSido.id,
          gugunId: newGugun.id,
        });
        const newStore = await this.stores.save(newSto);
        console.log('newStore: ', newStore);

        return {
          success: true,
          storeId: newStore.id,
        };
      } else {
        return {
          success: false,
          error: '이미 등록된 매장이 있습니다.',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: '매장 생성에 실패하였습니다.',
      };
    }
  }

  async updateStore(
    updateStoreInput: UpdateStoreInput,
  ): Promise<UpdateStoreOutput> {
    try {
      const result = await this.getStore({ storeId: updateStoreInput.storeId });

      if (result.success) {
        // 매장 정보 수정
        await this.stores.save([
          {
            id: updateStoreInput.storeId,
            ...updateStoreInput,
          },
        ]);

        return { success: true };
      } else {
        return result;
      }
    } catch (error) {
      return {
        success: false,
        error: '매장 정보 수정에 실패하였습니다.',
      };
    }
  }

  async deleteStore({ storeId }: DeleteStoreInput): Promise<DeleteStoreOutput> {
    try {
      const result = await this.getStore({ storeId });

      if (result.success) {
        // 매장 삭제
        await this.stores.delete(storeId);

        return { success: true };
      } else {
        return result;
      }
    } catch (error) {
      return {
        success: false,
        error: '매장 삭제를 실패하였습니다.',
      };
    }
  }
}
