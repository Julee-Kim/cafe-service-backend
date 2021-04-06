import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
import { GetStoresOutput } from './dtos/get-stores.dto';
import { Store } from './entities/store.entity';
import { StoresService } from './stores.service';

@Resolver((of) => Store)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @Mutation((returns) => CreateStoreOutput)
  createStore(
    @Args('input') createStoreInput: CreateStoreInput,
  ): Promise<CreateStoreOutput> {
    return this.storesService.createStore(createStoreInput);
  }
}
