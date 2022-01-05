# Fetch

Provide some utility wrappers for fetch.

## Installation

> npm install @leaf-x/fetch --save

## Use

```typescript
import {leafXFetch} from '@leaf-x/fetch';

await leafXFetch('https://www.leaf-x.app').then(result => {
  console.info(result);
});
```
