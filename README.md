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

## DEBUG build

create an .APK locally for later use :

```sh
eas build --profile development --platform android --local
```

install a build

```sh
adb install build.apk
```

uninstall a build

```sh
adb uninstall com.comicscrip.
```

create a build and run it direcltly :

```sh
npx expo run:android -d
```

## RELEASE build

```sh
eas build --profile preview --platform android --local
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
