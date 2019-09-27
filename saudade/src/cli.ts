
export interface Options {
  debug?: boolean;
  help?: boolean
  captureVideoMode: 'frames' | 'record' | 'shot'
}

export async function cli(options: Options) {
  options.debug && console.log(`CLI Options: ${JSON.stringify({ ...options, input: null })}`)
  if (options.help) {
    printHelpAndExit(0)
  }
  if (!options.captureVideoMode) {
    fail('Option --mode option is mandatory')
  }
}

export function fail(msg: string) {
  console.error(msg)
  printHelpAndExit(1)
}

function printHelpAndExit(code: number) {
  console.log(`
Usage: 

TODO
`)
  process.exit(code)
}
