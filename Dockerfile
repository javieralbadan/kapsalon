ARG NODE_ENV=development

FROM node:22 AS base
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install

FROM base AS dev
COPY . .
EXPOSE 4000
CMD ["yarn", "dev", "-p", "4000", "-H", "0.0.0.0"]

FROM base AS build
COPY . .
RUN yarn build

FROM node:22 AS runtime
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
EXPOSE 4000
CMD ["yarn", "start"]
