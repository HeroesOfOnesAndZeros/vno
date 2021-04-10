export async function watchChanges(
path: string,
onChange: Function,
) {
const watcher = Deno.watchFs(path);
//watches a path which (currently not given specific path)
for await (const event of watcher) {
  if (event.kind === "modify") {
    await onChange();
    return;
  }
  return
}
}