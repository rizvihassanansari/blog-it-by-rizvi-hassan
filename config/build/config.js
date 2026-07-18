import { createRequire } from "module";
import path from "path";

import { absolutePath } from "./constants.js";

const require = createRequire(import.meta.url);

const alias = {
  images: path.resolve(process.cwd(), "app/assets/images"),
  crypto: require.resolve("crypto-browserify"),
  path: require.resolve("path-browserify"),
  buffer: require.resolve("buffer"),
  stream: require.resolve("stream-browserify"),
  apis: absolutePath("src/apis"),
  common: absolutePath("src/common"),
  components: absolutePath("src/components"),
  constants: absolutePath("src/constants"),
  hooks: absolutePath("src/hooks"),
  routes: absolutePath("src/routes.js"),
  translations: absolutePath("src/translations"),
  stores: absolutePath("src/stores"),
  assets: absolutePath("../assets"),
  utils: absolutePath("src/components/utils"),
};

export { alias };
