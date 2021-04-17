# @leaf-x/fetch

Provide some utility wrappers for fetch.

## Installation

> npm install @leaf-x/fetch --save

## Usage

```typescript
import fetch from '@leaf-x/fetch'

await fetch('https://www.bing.com').then((response) => {
  console.info(response)
})
```
