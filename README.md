<!-- Project title -->
# Online Store API

<!-- Describe your project in brief -->
Build a Storefront Backend - Advanced Web Development egFWD - Second Project

This project was structured from scratch, with ZERO starter files.

# Table of Contents

- [Online Store API](#online-store-api)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Development](#development)
  - [Architecture](#architecture)
  - [API Documentation](#api-documentation)
- [Installed NPM Packages](#installed-npm-packages)
  - [Production Packages](#production-packages)
  - [Development Packages](#development-packages)
- [Useful Resources](#useful-resources)

# Installation

[(Back to top)](#table-of-contents)

To use this project, you need to follow the commands below:

1. Clone the repository into your local machine:

   ```bash
   git clone https://github.com/ibrahimelmokhtar/ts-online-store-api.git
   ```

2. Redirect inside the cloned repository:

    ```bash
    cd ts-online-store-api/
    ```

3. Install the required packages:

   ```bash
   npm install
   ```

4. Copy `example.env` file into `.env` file.

5. Fill the created `.env` file with corresponding/appropriate information.

6. *For applying configured styling*, run the following commands:
   - ***Prettier** styling*:

        ```bash
        npm run prettier
        ```

   - ***ESLint** styling*:

        ```bash
        npm run lint
        ```

7. *For manipulating the database*, run the following commands:
   - *Run **Up** Migrations*:

        ```bash
        npm run migration:run
        ```

   - *Run **Down** Migrations*:

        ```bash
        npm run migration:reset
        ```

8. *For working on the **development** phase*, run the following commands:
   - *Live debugging while development*:

        ```bash
        npm run watch
        ```

   - *Jasmine Testing*:

        ```bash
        npm run test
        ```

9. *For working with the **production** phase*, run the following commands:

    - *Build the project*:

        ```bash
        npm run build
        ```

        Then, *Run the compiled server*:

        ```bash
        node build/server.js
        ```

    - OR simply, *Start the server with one command*:

        ```bash
        npm run start
        ```

10. Open the local website on `http://127.0.0.1:5000/{endpoint}/{:queryParameters}`, more information about {endpoint} and {:queryParameters} will be explained in [API Docmentation](#api-documentation)

# Development

[(Back to top)](#table-of-contents)
This section will explain **how the code works** and **how everything is put together.**

## Architecture

[(Back to top)](#table-of-contents)

This project has the structure shown below:

<details>
    <summary>Project Structure</summary>

```ts
├─── docs/
    ├─── REQUIREMENTS.md
├─── migrations/
    ├─── sqls/
        ├─── 20220505125703-users-table-down.sql
        ├─── 20220505125703-users-table-up.sql
        ├─── 20220507132301-products-table-down.sql
        ├─── 20220507132301-products-table-up.sql
        ├─── 20220508135120-orders-table-down.sql
        ├─── 20220508135120-orders-table-up.sql
        ├─── 20220508135656-order-products-table-down.sql
        ├─── 20220508135656-order-products-table-up.sql
    ├─── 20220505125703-users-table.js
    ├─── 20220507132301-products-table.js
    ├─── 20220508135120-orders-table.js
    ├─── 20220508135656-order-products-table.js
├─── spec/
    ├─── support/
        ├─── jasmine.json
├─── src/
    ├─── config/
        ├─── env.config.ts
        ├─── server.config.ts
    ├─── constants/
        ├─── order.type.constant.ts
        ├─── orderProduct.type.constant.ts
        ├─── product.type.constant.ts
        ├─── unique.uuid.constant.ts
        ├─── user.type.constant.ts
    ├─── controllers/
        ├─── dashboard.controller.ts
        ├─── orderProducts.controller.ts
        ├─── orders.controller.ts
        ├─── products.controller.ts
        ├─── users.controller.ts
    ├─── database/
        ├─── __tests__/
            ├─── index.spec.ts
        ├─── index.ts
    ├─── helpers/
        ├─── guards/
            ├─── compare.ts
            ├─── encrypt.ts
        ├─── testing/
            ├─── reporter.ts
    ├─── middlewares/
        ├─── authentication.middleware.ts
        ├─── validation.middleware.ts
    ├─── models/
        ├─── __tests__/
            ├─── index.spec.ts
            ├─── order.model.spec.ts
            ├─── orderProduct.model.spec.ts
            ├─── product.model.spec.ts
            ├─── user.model.spec.ts
        ├─── order.model.ts
        ├─── orderProduct.model.ts
        ├─── product.model.ts
        ├─── user.model.ts
    ├─── routes/
        ├─── __tests__/
            ├─── dashboard.routes.spec.ts
            ├─── index.spec.ts
            ├─── orderProducts.routes.spec.ts
            ├─── orders.routes.spec.ts
            ├─── products.routes.spec.ts
            ├─── users.routes.spec.ts
        ├─── api/
            ├─── dashboard.routes.ts
            ├─── orderProducts.routes.ts
            ├─── orders.routes.ts
            ├─── products.routes.ts
            ├─── users.routes.ts
        ├─── index.ts
    ├─── schemas/
        ├─── orderProducts.schemas.ts
        ├─── orders.schemas.ts
        ├─── products.schemas.ts
        ├─── users.schemas.ts
    ├─── services/
        ├─── __tests__/
            ├─── dashboard.services.spec.ts
        ├─── dashboard.services.ts
    ├─── types/
        ├─── __tests__/
            ├─── index.spec.ts
            ├─── order.type.spec.ts
            ├─── orderProduct.type.spec.ts
            ├─── product.type.spec.ts
            ├─── user.type.spec.ts
        ├─── dashboard/
            ├─── ordersPerUser.type.ts
            ├─── productsInOrder.type.ts
            ├─── topProduct.type.ts
        ├─── order.type.ts
        ├─── orderProduct.type.ts
        ├─── product.type.ts
        ├─── user.type.ts
    ├─── server.ts
├─── .eslintrc
├─── .gitignore
├─── .prettierrc
├─── database.json
├─── example.env
├─── package.json
├─── README.md
├─── tsconfig.json
```

</details>

## API Documentation

[(Back to top)](#table-of-contents)

For more information about available endpoints, check this [REQUIREMENTS.md](docs/REQUIREMENTS.md) file.

# Installed NPM Packages

[(Back to top)](#table-of-contents)

These packages are required to run this project smoothly without any errors.

## Production Packages

These packages can be found in the `"dependencies"` object inside the `package.json` file.

- [bcrypt](https://www.npmjs.com/package/bcrypt) - A bcrypt library for NodeJS.
- [cors](https://www.npmjs.com/package/cors) - Node.js CORS middleware.
- [db-migrate](https://www.npmjs.com/package/db-migrate) - Database migration framework for node.js.
- [db-migrate-pg](https://www.npmjs.com/package/db-migrate-pg) - A postgresql driver for db-migrate.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from .env file.
- [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework.
- [express-validator](https://www.npmjs.com/package/express-validator) - Express middleware for the validator module.
- [helmet](https://www.npmjs.com/package/helmet) - Help secure Express/Connect apps with various HTTP headers.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token implementation (symmetric and asymmetric).
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js.
- [pg](https://www.npmjs.com/package/pg) - PostgreSQL client.
- [uuid](https://www.npmjs.com/package/uuid) - RFC4122 (v1, v4, and v5) UUIDs.

## Development Packages

These packages can be found in the `"devDependencies"` object inside the `package.json` file.

- [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt) - TypeScript definitions for bcrypt.
- [@types/cors](https://www.npmjs.com/package/@types/cors) - TypeScript definitions for cors.
- [@types/express](https://www.npmjs.com/package/@types/express) - TypeScript definitions for Express.
- [@types/jasmine](https://www.npmjs.com/package/@types/jasmine) - TypeScript definitions for Jasmine.
- [@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken) - TypeScript definitions for jsonwebtoken.
- [@types/morgan](https://www.npmjs.com/package/@types/morgan) - TypeScript definitions for morgan.
- [@types/pg](https://www.npmjs.com/package/@types/pg) - TypeScript definitions for pg.
- [@types/supertest](https://www.npmjs.com/package/@types/supertest) - TypeScript definitions for SuperTest.
- [@types/uuid](https://www.npmjs.com/package/@types/uuid) - TypeScript definitions for uuid.
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - An ESLint custom parser which leverages TypeScript ESTree.
- [eslint](https://www.npmjs.com/package/eslint) - An AST-based pattern checker for JavaScript.
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) - Turns off all rules that are unnecessary or might conflict with Prettier.
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) - Runs prettier as an eslint rule.
- [jasmine](https://www.npmjs.com/package/jasmine) - CLI for Jasmine, a simple JavaScript testing framework for browsers and Node.
- [jasmine-spec-reporter](https://www.npmjs.com/package/jasmine-spec-reporter) - Spec reporter for jasmine behavior-driven development framework.
- [prettier](https://www.npmjs.com/package/prettier) - Prettier is an opinionated code formatter.
- [supertest](https://www.npmjs.com/package/supertest) - SuperAgent driven library for testing HTTP servers.
- [tsc-watch](https://www.npmjs.com/package/tsc-watch) - The TypeScript compiler with onSuccess command.
- [typescript](https://www.npmjs.com/package/typescript) - TypeScript is a language for application scale JavaScript development.

# Useful Resources

[(Back to top)](#table-of-contents)

- [Documentation: HTTP Response Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Documentation: db-migrate Module](https://db-migrate.readthedocs.io/en/latest/)
- [Documentation: node-postgres Module](https://node-postgres.com/api/pool)
- [Documentation: bcrypt Module](https://github.com/kelektiv/node.bcrypt.js#usage)
- [Documentation: JWT Module](https://github.com/auth0/node-jsonwebtoken#readme)
- [Documentation: Express-Validator Module](https://express-validator.github.io/docs/)
- [Youtube Video: WebDevSimplified - What is JWT](https://www.youtube.com/watch?v=7Q17ubqLfaM)
- [Youtube Video: WebDevSimplified - MVC Explained](https://www.youtube.com/watch?v=DUg2SWWK18I)
- [Youtube Video: Use Express-Validator Module with NodeJs](https://www.youtube.com/watch?v=7i7xmwowwCY)
- [Article: Arrays in PostgreSQL](https://bipp.io/sql-tutorial/postgresql/create-an-array/)
- [Article: How to Modify Arrays in PostgreSQL](https://popsql.com/learn-sql/postgresql/how-to-modify-arrays-in-postgresql)
- [Article: How to use Code Blocks within Markdown Files](https://rdmd.readme.io/docs/code-blocks)
