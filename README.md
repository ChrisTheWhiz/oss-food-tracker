# Food_Tracker
An open source project for tracking your nutrition data, built with MEAN stack

For now the project is **NOT** functional, but a few characteristics like adding ingredients to the global database and signing up and in can be tested.

To build the project you will need a USDA API key and a MongoDB database instance.

### Getting the project

1. Clone the repo
2. Run `npm install`
3. Go to the shared_code folder and copy `.env-example` into `.env`, then edit the fields according to your environment
3. Still in the shared_code folder, copy `network-example.ts` into `network.ts` and edit according to your environment
5. Navigate to /backend and run `npm run start:dev`
6. Navigate to /control-panel and run `npm run start:dev`
