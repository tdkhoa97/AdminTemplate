#Stage-1
FROM node:17-alpine as build-stage
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . .
RUN npm run build

#Stage-2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]