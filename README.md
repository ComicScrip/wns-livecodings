# Getting started

[Install Docker](https://www.docker.com/products/docker-desktop/) and then :

```sh
docker-compose up
```

That's all folks !

# Mobile client

## Android

### DEBUG build

#### create a build and run it direcltly :

```sh
npx expo run:android -d
```

#### create an .APK locally for later use :

```sh
eas build --profile development --platform android --local
```

### RELEASE build

#### create an .APK locally for later use :

```sh
eas build --profile preview --platform android --local
```

### Install a build

#### install

```sh
adb install build-xxxxxxx.apk
```

#### uninstall (sometimes you need to uninstall first to install another build)

```sh
adb uninstall com.comicscrip.mobileclient
```

### Build APK in CI

```sh
git add . && git commit -m "mycommit" && git tag <version>
git push --tags
```

## iOS

create a build and run it direcltly :

```sh
npx expo run:ios -d

```
