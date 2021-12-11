FROM denoland/deno:alpine

COPY . .
RUN deno cache index.js

CMD ["run", "--allow-env", "--allow-read", "--allow-hrtime", "index.js"]
