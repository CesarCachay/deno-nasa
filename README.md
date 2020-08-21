# NASA Mission Control (GET, POST & DELETE apis)

To run this project you need to run the following versions: 

## In this project I used the following command to generate the lock file for security purposes of the dependencies.

- deno run --allow-read --allow-net --lock-write --lock=lock.json mod.ts

## To run the project

- deno upgrade --version 1.1.3
- Run deno run --allow--net --allow-read mod.ts
- To see the UI go to http://localhost:8000/index.html
- To see the api for planets http://localhost:8000/planets
- To see the api for launches http://localhost:8000/launches


To run the tests please run
- deno tests