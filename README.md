# consoleOverride

A simple helper script that modifies `console.debug`, `console.log`, `console.info`, `console.warn` and `console.error`.

### Installation
```bash
npm i https://github.com/Satoshi-Engineering/console-override
```

### Example usage

This example uses [TelegramSender](https://github.com/Satoshi-Engineering/telegram-sender).
Install with `npm i https://github.com/Satoshi-Engineering/telegram-sender`


```typescript
import consoleOverride from 'console-override'
import TelegramSender from 'telegram-sender'

const telegramSender = new TelegramSender({
  token: 'TOKEN_OF_YOUR_BOT',
  defaultChatId: 'ID_OF_THE_TARGET_CHAT',
  messagePrefix: 'Website backend error'
})

consoleOverride({
  onError: async (message) => {
    await telegramSender.sendMessage({ message })
  }
})

// In your code somewhere else:
console.error(new Error('Something bad happened'))

```
