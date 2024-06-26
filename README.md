# Console Hooks

_by the [#sathoshiengineeringcrew](https://satoshiengineering.com/)_

[![MIT License Badge](license-badge.svg)](LICENSE)

Console Hooks is a helper script that enhances standard console methods like `console.debug`, `console.log`, `console.info`, `console.warn` and `console.error`. It allows you to hook into these methods to add custom behavior, such as sending error messages to a remote logging service.

### Features

- Intercepts and modifies console method outputs
- Customizable hooks for each console method
- Easy integration with other services like Telegram

## Installation
```bash
npm i console-hooks
```

## Example usage

This example uses [TelegramSender](https://github.com/Satoshi-Engineering/telegram-sender).
Install with `npm i telegram-sender`


```typescript
import consoleHooks from 'console-hooks'
import TelegramSender from 'telegram-sender'

const telegramSender = new TelegramSender({
  token: 'TOKEN_OF_YOUR_BOT',
  defaultChatId: 'ID_OF_THE_TARGET_CHAT',
  messagePrefix: 'Website backend error'
})

consoleHooks({
  onError: async (message) => {
    await telegramSender.sendMessage({ message })
  }
})

// In your code somewhere else:
console.error('Something bad happened')


// You will receive a Telegram message similar to this:
[Website backend error]
[2024-06-26 15:26:12] Something bad happened

```

## Tip Us

If you like this project, give it a star! If you love it, fork it and take it out for dinner. 🌟🍽️  
And hey, why not [send some tip love?](https://satoshiengineering.com/tipjar/)
