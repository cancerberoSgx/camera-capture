import {CaptureOptions, VideoCapture} from 'camera-capture'
import {promises, mkdirSync, createWriteStream, writeFileSync} from 'fs'
import { withoutExtension } from 'misc-utils-of-mine-generic'
import { dirname, join, basename } from 'path'

export interface Options extends CaptureOptions{
  help?: boolean
  action: 'frames' | 'video'  |'audio'|'none'
  output?: string
  headless?: boolean
  timeout?: number
}

export async function cli(o: Options) {
  o.debug && console.log(`CLI Options: ${JSON.stringify({ ...o, input: null })}`)
  if (o.help) {
    printHelpAndExit(0)
  }
  if (!o.action) {
    fail('Option --action option is mandatory')
  }
  if(o.action==='frames'){
    const c = new VideoCapture(o)
    // let output = o.output ? 
      let counter = 0
      if(o.output){
        mkdirSync(dirname(o.output)||o.output, {recursive: true})
      }
    c.addFrameListener(frame => {
      if(o.output){
      const f = join( dirname(o.output!)||o.output!, withoutExtension(basename(o.output!)))+(counter+'').padStart(5, '0')+'.png'
        if(typeof o.shots!=='undefined' && counter++ > o.shots) {
          c.stop()
          return
        }
        writeFileSync(f, frame.data)
      }
      else{
        console.error('--output mandatory (TODO)');
         c.stop()
          return
        // writable.write(frame.data as any )
        // writable.write('\0')
        // writable.destroy()
      }
counter++
// console.log(counter, );

      // let output: Writable = process.stdout
        // const writable = !o.output ? process.stdout : createWriteStream(f)
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
