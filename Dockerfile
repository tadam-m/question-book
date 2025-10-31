FROM node:22-alpine

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

COPY . .

ARG full_version
ENV FULL_VERSION=$full_version

CMD [ "node", "server/index.mjs" ]