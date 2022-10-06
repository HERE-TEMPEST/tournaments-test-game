import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvSchema } from '../env.dto';

export const validateConfig = (configuration: Record<string, any>) => {
  const validatedConfig = plainToInstance(EnvSchema, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
