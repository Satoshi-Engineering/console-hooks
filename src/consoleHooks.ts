/* eslint-disable no-console */
import util from 'node:util'

function appendTime(args: Array<unknown>) {
  const timezoneOffset = (new Date()).getTimezoneOffset() * 60000
  const time = (new Date(Date.now() - timezoneOffset)).toISOString().replace(/T/, ' ').replace(/\..+/, '')

  if (typeof args[0] === 'string') {
    return [`[${time}] ${args[0]}`, ...args.slice(1)]
  }

  return [`[${time}]`, ...args]
}

export default ({
  onDebug = async (_: string) => undefined,
  onLog = async (_: string) => undefined,
  onInfo = async (_: string) => undefined,
  onWarn = async (_: string) => undefined,
  onError = async (_: string) => undefined,
}: {
  onDebug?: (message: string) => Promise<void>,
  onLog?: (message: string) => Promise<void>,
  onInfo?: (message: string) => Promise<void>,
  onWarn?: (message: string) => Promise<void>,
  onError?: (message: string) => Promise<void>,
} = {},
) => {
  // Save the original console functions
  const origDebug = console.debug
  const origLog = console.log
  const origInfo = console.info
  const origWarn = console.warn
  const origError = console.error

  console.debug = async (...args) => {
    const argsWithTime = appendTime(args)
    origDebug(...argsWithTime)

    const message = convertArgsToString(argsWithTime)
    await onDebug(message)
  }

  console.log = async (...args) => {
    const argsWithTime = appendTime(args)
    origLog(...argsWithTime)

    const message = convertArgsToString(argsWithTime)
    await onLog(message)
  }

  console.info = async (...args) => {
    const argsWithTime = appendTime(args)
    origInfo(...argsWithTime)

    const message = convertArgsToString(argsWithTime)
    await onInfo(message)
  }

  console.warn = async (...args) => {
    const argsWithTime = appendTime(args)
    origWarn(...argsWithTime)

    const message = convertArgsToString(argsWithTime)
    await onWarn(message)
  }

  console.error = async (...args) => {
    const argsWithTime = appendTime(args)
    origError(...argsWithTime)

    const message = convertArgsToString(argsWithTime)
    await onError(message)
  }
}

const convertArgsToString = (args: Array<unknown>) => {
  return args
    .map((value) => {
      if (typeof value === 'string') {
        return value
      }
      try {
        return util.inspect(value)
      } catch (error) {
        return 'console-hooks: Unable to util.inspect value, check error logs'
      }
    })
    .join('\n')
}
