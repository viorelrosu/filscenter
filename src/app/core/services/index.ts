import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

export const services: any[] = [AuthService, TokenStorageService];

export * from './auth.service';
export * from './token-storage.service';