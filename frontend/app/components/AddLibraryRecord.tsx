import { Modal, ModalOverlay, ModalContent, chakra, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Stack, FormControl, FormLabel, Input, FormErrorMessage, Select, Progress } from '@chakra-ui/react'
import { useFrappeCreateDoc, useFrappeFileUpload } from 'frappe-react-sdk'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    isOpen: boolean
    onClose: () => void
}
interface FormFields {
    library_name: string
    library_code: number
    status: string
}

export const AddLibraryRecord = ({ isOpen, onClose }: Props) => {

    const [file, setFile] = useState<File | null>(null)

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>()

    const { createDoc, loading, error } = useFrappeCreateDoc()

    const { upload, progress, loading: fileUploading } = useFrappeFileUpload()

    const onSubmit = async (data: FormFields) => {

        if (file) {
            upload(file, {
                isPrivate: true,
            }).then((res) => {
                createDocument(data, res.file_url)
            })
        } else {
            createDocument(data)
        }
    }

    const createDocument = (data: FormFields, fileUrl?: string) => {
        createDoc('Library', {
            ...data,
            attachment: fileUrl
        })
            .then(() => {
                onClose()
            })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Library</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            <FormControl isRequired isInvalid={!!errors.library_name}>
                                <FormLabel>Library Name</FormLabel>
                                <Input type='text' {...register('library_name', {
                                    required: "Library Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Library Name should be at least 3 characters"
                                    }
                                })} />
                                <FormErrorMessage>{errors.library_name?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={!!errors.library_code}>
                                <FormLabel>Library Code</FormLabel>
                                <Input type='text' {...register('library_code', {
                                    required: "Library Code is required",
                                    min: {
                                        value: 1,
                                        message: "Library Code should be at least 1"
                                    }
                                })} />
                                <FormErrorMessage>{errors.library_code?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired isInvalid={!!errors.status}>
                                <FormLabel>Status</FormLabel>
                                <Select {...register('status', {
                                    required: "Type is required"
                                })}>
                                    <option value=''>Select Status</option>
                                    <option value='Active'>Active</option>
                                    <option value='Inactive'>Inactive</option>
                                </Select>
                                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Attachment</FormLabel>
                                <Input type='file' onChange={(e) => {
                                    if (e.target.files) {
                                        setFile(e.target.files[0])
                                    }
                                }} />
                            </FormControl>
                            {fileUploading && <Progress value={progress} />}
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button isLoading={loading} type='submit' colorScheme='blue'>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </chakra.form>
        </Modal>
    )
}