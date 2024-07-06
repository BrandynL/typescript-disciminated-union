import { DiscriminatedUnion, Union } from './types'
/**
 * @description useful for composing your own discriminated union handling utilities
 */
export type DiscriminatedUnionProps<
  V extends {},
  K extends string,
  T extends Union<K, V>[],
  U extends DiscriminatedUnion<T>,
  TReturn
> = {
  value: U
  config: {
    [Property in U["case"]]: (v: Extract<U, {case:Property}>) => TReturn
  }
}

export const handleDiscriminatedUnion = <
  V extends {},
  K extends string,
  T extends Union<K, V>[],
  U extends DiscriminatedUnion<T>,
  TReturn
  >(props: DiscriminatedUnionProps<V, K, T, U, TReturn>) =>
    props.config[props.value.case]({
      case:props.value.case,
      value:props.value.value,
    } as Extract<U, {case:K}>)