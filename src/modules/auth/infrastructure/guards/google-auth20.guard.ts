import { AuthGuard } from '@nestjs/passport';

export class GoogleAuth20Guard extends AuthGuard('google') {}
