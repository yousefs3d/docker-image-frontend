FROM node:14-alpine AS build

WORKDIR /app

COPY . .

RUN npm install
 
RUN npm run build

# stage 2

FROM nginx:alpine

COPY --from=build /app/dist/* /usr/share/nginx/html