/* eslint-disable @typescript-eslint/no-invalid-void-type */
import React from 'react'

const EMPTY: unique symbol = Symbol('UNSTATED_NEXT_PRO_EMPTY')

export interface ContainerProviderProps<State = void> {
  initialState?: State
  children: React.ReactNode
}

export interface Container<Value, State = void> {
  Provider: React.ComponentType<ContainerProviderProps<State>>
  useContainer: () => Value
  Context: React.Context<typeof EMPTY | Value>
}

export function createContainer<Value, State = void>(
  useHook: (initialState?: State) => Value
): Container<Value, State> {
  const Context = React.createContext<Value | typeof EMPTY>(EMPTY)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function Provider(props: ContainerProviderProps<State>) {
    const value = useHook(props.initialState)
    return <Context.Provider value={value}>{props.children}</Context.Provider>
  }

  function useContainer(): Value {
    const value = React.useContext(Context)
    if (value === EMPTY) {
      throw new Error('Component must be wrapped with <Container.Provider>')
    }
    return value
  }

  return { Provider, useContainer, Context }
}

export function useContainer<Value, State = void>(
  container: Container<Value, State>
): Value {
  return container.useContainer()
}
