# Overview
Discriminated unions are a powerful utility that can help you keep your code closely-coupled, while helping to keep impossible state impossible with help from the compiler.

These features are already present in javascript/typescript, but this library aims to standardize your implementation, making unions easier to implement and interact with, while leaving a small footprint at less than 50KB.

## How to use
1. Create discriminated union type
```typescript

import { DiscriminatedUnion, Union } from 'typescript-discriminated-union'

type LoadedData = object[]
type LoadingUnion = DiscriminatedUnion<[
  Union<'Loading','loading data...'>,
  Union<'Loaded',LoadedData>,
]>

let myLoadedData:LoadingUnion = {
  case:'Loading',
  value:'loading data...'
}
```

2. Handle the union cases explicitly in your code
```typescript
import { handleDiscriminatedUnion } from 'typescript-discriminated-union'

handleDiscriminatedUnion({
  value:myLoadedData,
  config:{
    // the compiler will require each union to be handled
    Loading:x => {
      return x // returns string 'loading data...'
    },
    Loaded:x => {
      // here's your data, along with it's union case
      // returns your object[]
      return x
    },
  }
})
```

## Other use-cases
- This can be especially helpful when consuming unions in react via a react component
```typescript
export const DiscriminatedUnionHandler = <
  V extends {},
  K extends string,
  T extends Union<K, V>[],
  U extends DiscriminatedUnion<T>,
>(
  // note the React.ReactNode type supplied
  props: DiscriminatedUnionProps<V, K, T, U, React.ReactNode>
) => (
  <React.Fragment>
    {handleDiscriminatedUnion(props)}
  </React.Fragment>
)
```

By specifying the Treturn of the DiscriminatedUnionProps, you can limit the return type of your implementation

- This implementation requires each union's config to return a promise

```typescript
export const DiscriminatedUnionHandler = <
  V extends {},
  K extends string,
  T extends Union<K, V>[],
  U extends DiscriminatedUnion<T>,
>(
  props: DiscriminatedUnionProps<V, K, T, U, Promise>
) => (
  handleDiscriminatedUnion(props)
)
```

## Contributing

Feel free to fork the [official repository](https://github.com/BrandynL/typescript-disciminated-union) and submit a pull request with your proposal for changes. Please include a dscriptive summary of the changes you are making, and why you feel they should be implemented.

## Questions

Questions can be posted via GitHub issues on the [official repository](https://github.com/BrandynL/typescript-disciminated-union).