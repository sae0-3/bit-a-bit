FROM node:lts AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:lts AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node --run build

FROM node:lts AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main.js"]
