# Fetch

Provide some utility wrappers for fetch.

## Installation

> npm install @leaf-x/fetch --save

## Use

```typescript
import fetch from '@leaf-x/fetch';

await fetch('https://www.leaf-x.com').then(result => {
  console.info(result);
});
```
