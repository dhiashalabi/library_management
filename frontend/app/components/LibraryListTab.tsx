'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDocList,
} from 'frappe-react-sdk'
import { Library } from '@/types/LibraryManagement/Library'
import { AddLibraryRecord } from './AddLibraryRecord'

export const LibraryListTab = () => {
  const { data, isLoading, error, mutate } = useFrappeGetDocList<Library>(
    'Library',
    {
      fields: ['name', 'library_name', 'library_code', 'status'],
    },
  )

  const { isOpen, onOpen, onClose } = useDisclosure()

  useFrappeDocTypeEventListener('Library Record', (d) => {
    console.log('Event', d)
    if (d.doctype === 'Library Record') {
      mutate()
    }
  })

  const getMessage = () => {
    if (error?._server_messages && typeof error._server_messages === 'string') {
      try {
        // Parse the JSON string
        const messagesArray = JSON.parse(error._server_messages)
        if (Array.isArray(messagesArray) && messagesArray.length > 0) {
          // Extract the message from the first item in the array
          const messageObject = JSON.parse(messagesArray[0])
          return messageObject.message || 'An unknown error occurred'
        }
      } catch (e) {
        console.error('Error parsing _server_messages:', e)
        return 'An error occurred while processing the error message'
      }
    }
    return 'An error occurred'
  }

  return (
    <Stack>
      <HStack justify={'space-between'}>
        <Heading as="h3" fontSize={'xl'}>
          Libraries
        </Heading>
        <Box>
          <button className="btn" onClick={onOpen}>
            Add
          </button>
        </Box>
      </HStack>

      {isLoading && (
        <Center h="40vh">
          <Spinner />
        </Center>
      )}
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span >
          <h3 className="font-bold">{error.httpStatusText}{' '}{error.httpStatus}</h3>
          <div className="text-sm" dangerouslySetInnerHTML={{ __html: getMessage() }}></div>
          </span>
        </div>
      )}

      {data && (
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Library Name</Th>
              <Th>Library Code</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d: Library) => (
              <Tr key={d.name}>
                <Td>{d.name}</Td>
                <Td>{d.library_name}</Td>
                <Td>{d.library_code}</Td>
                <Td>{d.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <AddLibraryRecord isOpen={isOpen} onClose={onClose} />
    </Stack>
  )
}
