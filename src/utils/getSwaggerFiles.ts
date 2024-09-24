import { get } from 'node:http';
import env from './env';
import { createWriteStream } from 'node:fs';
import { Logger } from '@nestjs/common';

export function getSwaggerFiles() {
  const logger = new Logger();
  get(
    `${env.SERVER_URL}/${env.SWAGGER_ROUTE}/swagger-ui-bundle.js`,
    function (response) {
      response.pipe(createWriteStream('static/swagger/swagger-ui-bundle.js'));
      logger.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    },
  );

  get(
    `${env.SERVER_URL}/${env.SWAGGER_ROUTE}/swagger-ui-init.js`,
    function (response) {
      response.pipe(createWriteStream('static/swagger/swagger-ui-init.js'));
      logger.log(
        `Swagger UI init file written to: 'static/swagger/swagger-ui-init.js'`,
      );
    },
  );

  get(
    `${env.SERVER_URL}/${env.SWAGGER_ROUTE}/swagger-ui-standalone-preset.js`,
    function (response) {
      response.pipe(
        createWriteStream('static/swagger/swagger-ui-standalone-preset.js'),
      );
      logger.log(
        `Swagger UI standalone preset file written to: 'static/swagger/swagger-ui-standalone-preset.js'`,
      );
    },
  );

  get(
    `${env.SERVER_URL}/${env.SWAGGER_ROUTE}/swagger-ui-standalone-preset.js`,
    function (response) {
      response.pipe(
        createWriteStream('static/swagger/swagger-ui-standalone-preset.js'),
      );
      logger.log(
        `Swagger UI standalone preset file written to: 'static/swagger/swagger-ui-standalone-preset.js'`,
      );
    },
  );

  get(
    `${env.SERVER_URL}/${env.SWAGGER_ROUTE}/swagger-ui.css`,
    function (response) {
      response.pipe(createWriteStream('static/swagger/swagger-ui.css'));
      logger.log(
        `Swagger UI css file written to: 'static/swagger/swagger-ui.css'`,
      );
    },
  );
}
