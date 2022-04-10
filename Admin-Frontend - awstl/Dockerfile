FROM node:alpine AS build
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "build"]
RUN npm run build

FROM nginx:alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html/admin
#COPY build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
ENV PUBLIC_URL="/admin"
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]