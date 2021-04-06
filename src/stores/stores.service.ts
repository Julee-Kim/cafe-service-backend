import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
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
        console.log(' -- 스토어 생성 ');
        const newSto = await this.stores.create({
          ...createStoreInput,
          gugunId: newGugun.id,
        });
        console.log(newSto);
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
}
