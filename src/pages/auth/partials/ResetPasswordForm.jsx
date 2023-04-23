import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

const ResetPasswordForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{
                password: '',
                passwordConfirmation: '',
            }}
            validate={(values) => {
                const errors = {};

                if (!values.password) {
                    errors.password = 'Password tidak boleh kosong';
                } else if (values.password.length < 6) {
                    errors.password = 'Password minimal 6 karakter.';
                }

                if (!values.passwordConfirmation) {
                    errors.passwordConfirmation =
                        'Konfirmasi password tidak boleh kosong';
                } else if (values.passwordConfirmation.length < 6) {
                    errors.passwordConfirmation =
                        'Konfirmasi password minimal 6 karakter.';
                }

                if (values.password !== values.passwordConfirmation) {
                    errors.passwordConfirmation =
                        'Password dan konfirmasi password tidak sama.';
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) =>
                onSubmit(values, setSubmitting)
            }
        >
            {(props) => (
                <Form>
                    <Stack spacing={4}>
                        <Field name={'password'}>
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.password &&
                                        form.touched.password
                                    }
                                >
                                    <FormLabel fontSize={'sm'}>
                                        Password
                                    </FormLabel>
                                    <Input
                                        name='password'
                                        type='password'
                                        placeholder={'••••••••'}
                                        {...field}
                                    />
                                    <FormErrorMessage>
                                        {form.errors.password}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name={'passwordConfirmation'}>
                            {({ field, form }) => (
                                <FormControl
                                    id='passwordConfirmation'
                                    isInvalid={
                                        form.errors.passwordConfirmation &&
                                        form.touched.passwordConfirmation
                                    }
                                >
                                    <FormLabel fontSize={'sm'}>
                                        Konfirmasi password
                                    </FormLabel>
                                    <Input
                                        name='passwordConfirmation'
                                        type='password'
                                        placeholder='••••••••'
                                        {...field}
                                    />
                                    <FormErrorMessage>
                                        {form.errors.passwordConfirmation}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                    </Stack>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        fontSize={'sm'}
                        w={'full'}
                        mt={8}
                        type={'submit'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        isLoading={props.isSubmitting}
                    >
                        Ubah password
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ResetPasswordForm;
