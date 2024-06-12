import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("sds");
export default [
  def
    ? def
    : {
    label: "HTTP插件",
    json: `
      // https://gost.run/concepts/sd/
      {
        "name": "sd-0",
        "plugin": {
          "type": "http",
          "addr": "http://127.0.0.1:8000/sd",
          // "token": "gost",
          // "tls": {}
        }
      }`,
  },
] as Template[];
