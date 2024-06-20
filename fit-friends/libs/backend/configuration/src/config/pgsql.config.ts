import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface PostgresConfig {
  postgesUser: string;
  postgesPassword: string;
  postgesDb: string;
  panelEmail: string;
  panelPassword: string;
}

const validationSchema = Joi.object({
  postgesUser: Joi.string().valid().required(),
  postgesPassword: Joi.string().required(),
  postgesDb: Joi.string().required(),
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
    postgesUser: process.env.POSTGRES_USER ?? '',
    postgesPassword: process.env.POSTGRES_PASSWORD ?? '',
    postgesDb: process.env.POSTGRES_DB ?? '',
    panelEmail: process.env.PGADMIN_DEFAULT_EMAIL ?? '',
    panelPassword: process.env.PGADMIN_DEFAULT_PASSWORD ?? '',
  };

  validateConfig(config);
  return config;
}

export default registerAs('postgres', getConfig);
