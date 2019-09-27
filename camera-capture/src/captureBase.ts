import { Server } from 'http'
import { mergeRecursive, notSameNotFalsy, sleep } from 'misc-utils-of-mine-generic'
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
    this.server = await staticServer(__dirname, this.o.port || 8080)
    this.browser = await puppeteer.launch(mergeRecursive(
      {
        ...{},
        ...this.o.puppeteerOptions
      },
      {
        headless: true,
        args: ['--disable-web-security', '--allow-file-access', '--use-fake-ui-for-media-stream', ...this.o.puppeteerOptions && this.o.puppeteerOptions.args || []].filter(notSameNotFalsy)
      }
    ))
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

