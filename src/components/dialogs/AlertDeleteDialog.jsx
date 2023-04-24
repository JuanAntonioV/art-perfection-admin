import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

const AlertDeleteDialog = ({
    isOpen,
    onClose,
    title,
    detail,
    btnText,
    action,
    id,
    btnColor = 'red',
}) => {
    const cancelRef = useRef();

    const handleDelete = () => {
        action(id);
        onClose();
    };

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            motionPreset={'slideInBottom'}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {title || 'Delete User'}
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />

                    <AlertDialogBody>
                        {detail ||
                            'Are you sure? You can not undo this action.'}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme={btnColor}
                            onClick={handleDelete}
                            ml={3}
                        >
                            {btnText || 'Delete'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default AlertDeleteDialog;
