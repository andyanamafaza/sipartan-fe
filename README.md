# SIPARTAN

## Packages Installation
```
npm install
```

## Running the project (development)
First, create an account and get an API Key for:
1) https://docs.binderbyte.com/api/wilayah
2) https://geocode.maps.co
3) https://openweathermap.org/current

Then, create a .env file in the main directory with contents as below:
```
VITE_OPENWEATHER_APIKEY = "API_KEY_HERE"
VITE_BINDERBYTE_APIKEY = "API_KEY_HERE"
VITE_GEOCODING_APIKEY = "API_KEY_HERE"
```

Finally, run the app in development mode (port 5173)
```
npm run dev
```

## Deploying the project (Firebase Hosting)
Install firebase-tools.
```
npm install -g firebase-tools
```
Login using the SIPARTAN google account.
```
firebase login
```
Build the project and deploy.
```
npm run build
firebase deploy
```

## Back-End documentation
https://github.com/Rozanmln/sipartan-be