import { vueLogger } from "../lib/type_gaurds.ts";
import { Options } from "../dts/type.vno.d.ts";
import { fs, path } from "../lib/deps.ts";

export async function configReader(): Promise<void | Options> {
  let configFile;
  for await (const file of fs.walk(Deno.cwd())) {
    const currFile = path.parse(file.path);
    if (currFile.name === "vno.config") {
      configFile = currFile;
    }
  }

  if (configFile) {
    const configPath = `${Deno.cwd()}/${configFile.base}`;
    const json = await Deno.readTextFile(configPath);
    const res = JSON.parse(json);
    res.vue = vueLogger(res);
    return res as Options;
  }
}
