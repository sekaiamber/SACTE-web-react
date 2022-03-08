import React from 'react'
// import { Container } from './unstatedNextPro'
// 业务层
import System from './system'
import ThreeDebug from './threeDebug'

// const models = {
//   ThreeDebug,
// }

// function compose(containers: Array<Container<any, any>>) {
//   return function Component(props: any) {
//     return containers.reduceRight(
//       (children: React.ReactNode, Container: Container<any, any>) => (
//         <Container.Provider>{children}</Container.Provider>
//       ),
//       props.children
//     ) as ReactElement
//   }
// }

// const ComposedStore = compose(Object.values(models))

const Store: React.FC = ({ children }) => {
  console.log(`global contexts have been re-rendered at: ${Date.now()}`)

  // return <ComposedStore>{children}</ComposedStore>
  return (
    <System.Provider>
      <ThreeDebug.Provider>{children}</ThreeDebug.Provider>
    </System.Provider>
  )
}

export default Store
