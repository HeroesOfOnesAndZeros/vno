import * as watcher from "./src/watcher.ts";
import { exec } from "https://deno.land/x/exec/mod.ts";

async function  main() {
  console.log("Watching for file changes.");
//anychanges => logic here for deno run builds
  await watcher.watchChanges(".", async () => {
    console.log("File change detected.");
    return await exec('deno run -A --unstable --allow-write ./install/vno.ts build')
  
  })
  
}
main();