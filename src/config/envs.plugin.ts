//Esta clase sirve para guardar las variables de entorno y conectarnos a las distinas clases
import 'dotenv/config'
import * as env from 'env-var'

export const envs = {
  PORT: env.get("PORT").asPortNumber(),
  MONGO_URL: env.get("MONGO_URL").asString(),
  MAIL_SERVICE: env.get("MAIL_SERVICE").required().asString(),
  MAIL_SECRET_KEY: env.get("MAIL_SECRET_KEY").required().asString(),
  MAIL_USER: env.get("MAIL_USER").required().asString(),
  MAPBOX_ACCESS_TOKEN: env.get("MAPBOX_ACCESS_TOKEN").required().asString()
}