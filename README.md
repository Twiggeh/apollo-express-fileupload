## Requisites

1. node v15
2. yarn
3. tsc
4. bash

## Start by

1. running `yarn install` in both `client` and `server`
2. running `Start debugging session` from VSC twice (For the initial start. Nodemon behaves weirdly when the file that it is supposed to run doesn't exist, so if there is nothing in dist it will try running `index.js` which will fail indefinitely. Because of that spinning it up once to create the files and then stopping and starting it again is required for the server to run )
3. CRA tries to set client's tsconfig.json `jsx` to `react-jsx` which should just be `react`.
