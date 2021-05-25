import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { FraseMotivadoraService } from './frase-motivadora.service';
import { ServiciosService } from './servicios.service';
import { MailService } from './mail.service';
import { VersionCheckService } from './version-check.service';

export const services: any[] = [
    AuthService,
    TokenStorageService,
    FraseMotivadoraService,
    ServiciosService,
    MailService,
    VersionCheckService
];

export * from './auth.service';
export * from './token-storage.service';
export * from './frase-motivadora.service';
export * from './servicios.service';
export * from './mail.service';
export * from './version-check.service';