# Ubisoft DNA Technical Project

> node 13.6.0 & npm 6.13.6

## Technology

**Frontend**: Angular, RxJS, Typescript, mdbootstrap

**Back-End**: Nestjs, Rxjs with PubNub for realtime communication

## Development server

First run `npm install` to install all dependencies.

Run `npm run serve` to start both **frontend/backend** dev servers.

- **frontend**: navigate to http://localhost:4200/
- **backend**: available at http://localhost:3333/

The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts for both **frontend & api** will be stored in the `dist/` directory.

## Routes

**GET** /api/twitch/games-viewers-count

Returns the total streams viewers counts for:

- Rainbow Six Siege
- Far Cry 5
- Assassin’s Creed Odyssey

Example response:

```json
// Status: 200 OK
[
  {
    "name": "Rainbow Six Siege",
    "id": "460630",
    "abrev": "R6S",
    "viewersCount": 13793
  },
  ...
]
```
