import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process'

describe('Console helper which overides the default console functions', () => {

  it('prepends the current time to console outputs', (done) => {
    const stdoutData = ['Debug', 'Log', 'Info', '{ test: \'Object\' }']
    const stderrData = ['Warn', 'Error']

    let stdoutLines: Array<string> = []
    let stderrLines: Array<string> = []


    const filename = fileURLToPath(import.meta.url)
    // const filename = __filename
    const directory = dirname(filename)

    const testAppFilePath = `${directory}/consoleHooks.file.ts`

    // Run the script
    const app = spawn('npx', ['tsx', testAppFilePath])

    // Collecting stdout
    app.stdout.on('data', data => {
      stdoutLines = stdoutLines.concat(data.toString().split('\n').filter((v: string) => v.length))
    })

    // Collecting stderr
    app.stderr.on('data', data => {
      stderrLines = stderrLines.concat(data.toString().split('\n').filter((v: string) => v.length))
    })

    // Check output after process is finished
    app.on('close', (code) => {
      expect(code).toBe(0)
      stdoutLines.forEach((v, i) => {
        expect(v).toMatch(new RegExp(/[[0-9\-: ]*] /g))
        // strip ansi characters (colorization of console outputs)
        // eslint-disable-next-line no-control-regex
        const justText = v.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
        expect(justText).toContain(stdoutData[i])
      })
      stderrLines.forEach((v, i) => {
        expect(v).toMatch(new RegExp(/[[0-9\-: ]*] /g))
        expect(v).toContain(stderrData[i])
      })
      done()
    })
  }, 25000)
})
