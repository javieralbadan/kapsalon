# Primera etapa - Base
FROM node:22 AS base
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install

# Segunda etapa - Desarrollo
FROM base AS dev
COPY . .
ENV NODE_ENV=development
EXPOSE 4000
CMD ["yarn", "dev", "-p", "4000", "-H", "0.0.0.0"]

# Tercera etapa - Build
FROM base AS build
COPY . .
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN yarn build

# Cuarta etapa - Producción
FROM node:22 AS runtime
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
ENV NODE_ENV=production
EXPOSE 4000
CMD ["yarn", "start"]
