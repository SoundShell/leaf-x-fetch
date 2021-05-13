# Fetch

Provide some utility wrappers for fetch.

## Installation

> npm install @leaf-x/fetch --save

## Usage

```typescript
import {fetch} from '@leaf-x/fetch';

await fetch('https://leaf-x.app').then(result => {
  console.info(result);
});
```
