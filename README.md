# Getting started

[Install Docker](https://www.docker.com/products/docker-desktop/) and then :

```sh
docker-compose up
```

That's all folks !

# Mobile client

```sh
cd mobile-client
```

## create a dev build

### Android

create an .APK locally for later use :

```sh
eas build --profile development --platform android --local
```

create a build and run it direcltly :

```sh
npx expo run:android -d
```

### iOS

create an .APP locally for later use :

```sh
eas build --profile development-simulator --platform ios --local
```

create a build and run it direcltly :

```sh
npx expo run:ios -d
```

## create a relase build
