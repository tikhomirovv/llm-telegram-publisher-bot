FROM oven/bun:1.0.21-alpine as base
WORKDIR /usr/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "start" ]
