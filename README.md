# Frameleaf app store for Runtipi

[Frameleaf](https://frameleaf.app) is a self-hosted photo and video library. This repository is a [Runtipi](https://runtipi.io) app store with one app: Frameleaf (server, machine learning and PostgreSQL).

## Add the store

1. In Runtipi, open **Settings → App stores** and choose **Add app store**.
2. Enter `https://github.com/Frameleaf/runtipi-appstore` as the URL.
3. Open the **App store**, find **Frameleaf** and install it.

Runtipi 4.5 or later is required. The library is stored in `media/data/images/frameleaf` in your Runtipi folder. Guide: [frameleaf.app/docs/nas/app-stores](https://frameleaf.app/docs/nas/app-stores/#runtipi).

The app follows the latest Frameleaf release; when a new release ships, Runtipi offers the update. Frameleaf is in beta: keep another copy of your photos and videos.

## Development

`bun install && bun test` validates `config.json` and `docker-compose.json` against Runtipi's schemas. CI also starts the stack from `docker-compose.json` and checks that the server and machine learning answer.

Source: [Frameleaf/frameleaf-app](https://github.com/Frameleaf/frameleaf-app) (AGPL-3.0). Questions: support@frameleaf.app.
