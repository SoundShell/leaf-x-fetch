# Fetch

Provide some utility wrappers for fetch.

## Installation

> npm install @leaf-x/fetch --save

## Usage

```typescript
import {leafXFetch} from '@leaf-x/fetch';

await leafXFetch('https://leaf-x.app').then(response => {
  console.info(response);
});
```
