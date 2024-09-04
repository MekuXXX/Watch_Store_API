import { get } from 'node:http';
import env from './env';
import { createWriteStream } from 'node:fs';

export function getSwaggerFiles() {
  get(
    `${env.SERVER_URL}/${env.SWAGGER_ROUTE}/swagger-ui-bundle.js`,
    function (response) {
      response.pipe(createWriteStream('static/swagger/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    },
  );

  get(
    `${env.SERVER_URL}/${env.SWAGGER_ROUTE}/swagger-ui-init.js`,
    function (response) {
      response.pipe(createWriteStream('static/swagger/swagger-ui-init.js'));
      console.log(
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
      console.log(
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
      console.log(
        `Swagger UI standalone preset file written to: 'static/swagger/swagger-ui-standalone-preset.js'`,
      );
    },
  );

  get(
    `${env.SERVER_URL}/${env.SWAGGER_ROUTE}/swagger-ui.css`,
    function (response) {
      response.pipe(createWriteStream('static/swagger/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: 'static/swagger/swagger-ui.css'`,
      );
    },
  );
}
