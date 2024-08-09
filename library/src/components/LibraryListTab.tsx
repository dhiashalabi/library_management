import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, HStack, Heading, Spinner, Stack, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { useFrappeDocTypeEventListener, useFrappeGetDocList } from "frappe-react-sdk"
import { AddLibraryRecord } from "./AddLibraryRecord"
import { Library } from "../types/LibraryManagement/Library"


export const LibraryListTab = () => {

    const { data, isLoading, error, mutate } = useFrappeGetDocList<Library>('Library', {
        fields: ['name', 'library_name', 'library_code', 'status']
    })

    const { isOpen, onOpen, onClose } = useDisclosure()

    useFrappeDocTypeEventListener('Library Record', (d) => {
        console.log("Event", d)
        if (d.doctype === "Library Record") {
            mutate()
        }
    })

    return (
        <Stack>
            <HStack justify={'space-between'}>
                <Heading as='h3' fontSize={'xl'}>Libraries</Heading>
                <Box>
                    <Button colorScheme="blue" onClick={onOpen}>Add</Button>
                </Box>
            </HStack>

            {isLoading && <Center h='40vh'><Spinner /></Center>}
            {error && <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{error.exception}</AlertTitle>
                <AlertDescription>{error.httpStatusText} {error.httpStatus}</AlertDescription>
            </Alert>}

            {data && <Table>
                <Thead>
                    <Tr>
                        <Th>
                            ID
                        </Th>
                        <Th>
                            Library Name
                        </Th>
                        <Th>
                            Library Code
                        </Th>
                        <Th>
                            Status
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((d: Library) => <Tr key={d.name}>
                        <Td>
                            {d.name}
                        </Td>
                        <Td>
                            {d.library_name}
                        </Td>
                        <Td>
                            {d.library_code}
                        </Td>
                        <Td>
                            {d.status}
                        </Td>
                    </Tr>)}
                </Tbody>
            </Table>}
            <AddLibraryRecord isOpen={isOpen} onClose={onClose} />
        </Stack>
    )
}