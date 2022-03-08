import React, { useMemo } from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import Store from './store'
import { Routers } from './routes'

const App: React.FC = () => {
  const queryClient = useMemo(() => {
    return new QueryClient()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <Store>
        <Routers />
      </Store>
    </QueryClientProvider>
  )
}

export default App
