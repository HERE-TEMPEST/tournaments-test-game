import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvironmentVariablesDto } from '../env.dto';

export const validateConfig = (configuration: Record<string, any>) => {
  const validatedConfig = plainToInstance(
    EnvironmentVariablesDto,
    configuration,
    {
      enableImplicitConversion: true,
    },
  );

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
