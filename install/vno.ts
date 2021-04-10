import { build, create, flags, run } from "../core/cli/commands.ts";  //need to add dev
import { cmnd } from "../core/cli/constants.ts";

//this is how you pass command line arguments to Deno, every space is an index of an array of args
const { args } = Deno;
const command = args[0];

if (cmnd.help.test(command) || cmnd.info.test(command)) flags(args);

// ensure permissions
const read = { name: "read" } as const;
const write = { name: "write" } as const;
// const run = { name: "run" } as const;

// permission requests
const resRead = await Deno.permissions.request(read);
const resWrite = await Deno.permissions.request(write);

//testing to see the command in the command line
if (resRead && resWrite) {
  if (cmnd.create.test(command)) await create(args);
  if (cmnd.build.test(command)) await build(args);
  if (cmnd.run.test(command)) await run(args);
  
//   if (cmnd.dev.test(command)) {
//     const resRun = await Deno.permissions.request(run);
//     if(resRun) await dev(args);  
// }
}
