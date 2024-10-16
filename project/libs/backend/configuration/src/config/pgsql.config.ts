import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface PostgresConfig {
  postgresUser: string;
  postgresPassword: string;
  postgresDb: string;
  panelEmail: string;
  panelPassword: string;
}

const validationSchema = Joi.object({
  postgresUser: Joi.string().valid().required(),
  postgresPassword: Joi.string().required(),
  postgresDb: Joi.string().required(),
  panelEmail: Joi.string().required(),
  panelPassword: Joi.string().required(),
});

function validateConfig(config: PostgresConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Postgres Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): PostgresConfig {
  const config: PostgresConfig = {
    postgresUser: process.env.POSTGRES_USER ?? '',
    postgresPassword: process.env.POSTGRES_PASSWORD ?? '',
    postgresDb: process.env.POSTGRES_DB ?? '',
    panelEmail: process.env.PGADMIN_DEFAULT_EMAIL ?? '',
    panelPassword: process.env.PGADMIN_DEFAULT_PASSWORD ?? '',
  };

  validateConfig(config);
  return config;
}

export default registerAs('postgres', getConfig);
