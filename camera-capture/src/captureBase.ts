import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'fs'
import { Server } from 'http'
import { mergeRecursive, notSameNotFalsy, sleep } from 'misc-utils-of-mine-generic'
import { tmpdir } from 'os'
import { join } from 'path'
import puppeteer from 'puppeteer'
import { staticServer } from './staticServer'
import { CaptureBaseOptions } from './types'

export class CaptureBase {

  protected server?: Server
  protected browser?: puppeteer.Browser
  protected page?: puppeteer.Page

  constructor(protected o: CaptureBaseOptions = {}) {
  }

  async stop() {
    await this.server!.close()
    await sleep(10)
    await this.browser!.close()
    await sleep(10)
  }

  async initialize() {
    await this.launch()
  }

  protected async launch() {
    const dir = this.o.mkdirServed === true ? join(tmpdir(), 'camera-capture') : typeof this.o.mkdirServed === 'string' ? this.o.mkdirServed : __dirname
    if (this.o.mkdirServed && !existsSync(join(dir, 'index.html'))) {
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, 'index.html'), readFileSync(realpathSync(join(__dirname, 'index.html'))))
    }
    this.o.debug && console.log('Serving index.html on port ' + (this.o.port || 8080) + '. Folder: "' + dir + '"')
    this.server = await staticServer(dir, this.o.port || 8080)
    const pOptions = mergeRecursive({
      ...{},
      ...this.o.puppeteerOptions
    },
      {
        headless: true,
        args: ['--disable-web-security', '--allow-file-access', '--use-fake-ui-for-media-stream', ...this.o.puppeteerOptions && this.o.puppeteerOptions.args || []].filter(notSameNotFalsy)
      })
    this.o.debug && console.log(`Puppeteer options: ${JSON.stringify(pOptions)}`)

    this.browser = await puppeteer.launch(pOptions)
    this.page = await this.browser.newPage()
    this.page.on('console', e => {
      if (e.type() === 'error') {
        console.error('error: ' + JSON.stringify(e.location()) + '\n' + e.text().split('\n').join('\n'))
      }
      console.log('log: ' + JSON.stringify(e.location()) + '\n' + e.text())
    })
    await this.page.goto(`http://127.0.0.1:${this.o.port || 8080}/index.html`)

  }


}

