import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
import { GetStoreInput, GetStoreOutput } from './dtos/get-store.dto';
import { GetStoresInput, GetStoresOutput } from './dtos/get-stores.dto';
import { UpdateStoreInput, UpdateStoreOutput } from './dtos/update-store.dto';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';

@Resolver((of) => Store)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @Query((returns) => GetStoresOutput)
  getStores(
    @Args('input') getStoresInput: GetStoresInput,
  ): Promise<GetStoresOutput> {
    return this.storesService.getStores(getStoresInput);
  }

  @Query((returns) => GetStoreOutput)
  getStore(
    @Args('input') getStoreInput: GetStoreInput,
  ): Promise<GetStoreOutput> {
    return this.storesService.getStore(getStoreInput);
  }

  @Mutation((returns) => CreateStoreOutput)
  createStore(
    @Args('input') createStoreInput: CreateStoreInput,
  ): Promise<CreateStoreOutput> {
    return this.storesService.createStore(createStoreInput);
  }

  @Mutation((returns) => UpdateStoreOutput)
  updateStore(
    @Args('input') updateStoreInput: UpdateStoreInput,
  ): Promise<UpdateStoreOutput> {
    return this.storesService.updateStore(updateStoreInput);
  }
}
