import {CaptureOptions, VideoCapture} from 'camera-capture'
import {promises, mkdirSync, createWriteStream, writeFileSync} from 'fs'
import { withoutExtension } from 'misc-utils-of-mine-generic'
import { dirname, join, basename } from 'path'

export interface Options extends CaptureOptions{
  help?: boolean
  captureVideoMode: 'frames' | 'record' | 'shot'
  output?: string
  timeout?: number
}

export async function cli(o: Options) {
  o.debug && console.log(`CLI Options: ${JSON.stringify({ ...o, input: null })}`)
  if (o.help) {
    printHelpAndExit(0)
  }
  if (!o.captureVideoMode) {
    fail('Option --mode option is mandatory')
  }
  if(o.captureVideoMode==='frames'){
    const c = new VideoCapture(o)
    // let output = o.output ? 
      let counter = 0
      if(o.output){
        mkdirSync(dirname(o.output)||o.output, {recursive: true})
      }
    c.addFrameListener(frame => {
console.log(counter, join( dirname(o.output!)||o.output!, withoutExtension(basename(o.output!)))+counter+'.png');

      // let output: Writable = process.stdout
        if(typeof o.shots!=='undefined' && counter++ > o.shots) {
          c.stop()
        }
        writeFileSync(join( dirname(o.output!)||o.output!, withoutExtension(basename(o.output!)))+counter+'.png', frame.data)
        const writable = !o.output ? process.stdout : createWriteStream(join( dirname(o.output!)||o.output!, withoutExtension(basename(o.output!)))+counter+'.png')
      if(!o.output){
        // writable.write(frame.data as any )
        // writable.write('\0')
        // writable.destroy()
      }
      // else {

      // }
    })
  await c.start()
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
