import { SetMetadata } from "@nestjs/common";

export type AllowedTypes = 'LoggedIn';

export const Allow = (types: AllowedTypes) => SetMetadata('allowedType', types);