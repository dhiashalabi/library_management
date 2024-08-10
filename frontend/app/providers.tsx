'use client'

import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

const FrappeProvider = dynamic(
  () => import('frappe-react-sdk').then((mod) => mod.FrappeProvider),
  { ssr: false },
)

interface ProvidersProps {
  children: ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <FrappeProvider
      socketPort={process.env.NEXT_PUBLIC_SOCKET_PORT}
      url="http://react.localhost:8000"
    >
      <ChakraProvider>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </ChakraProvider>
    </FrappeProvider>
  )
}

export default Providers
