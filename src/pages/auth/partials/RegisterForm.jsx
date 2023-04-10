import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

const RegisterForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                fullName: '',
            }}
            validate={(values) => {
                const errors = {};

                if (!values.email) {
                    errors.email = 'Email tidak boleh kosong';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                    )
                ) {
                    errors.email = 'Alamat email tidak valid';
                }

                if (!values.password) {
                    errors.password = 'Password tidak boleh kosong';
                } else if (values.password.length < 6) {
                    errors.password = 'Password minimal 6 karakter';
                }

                if (!values.fullName) {
                    errors.fullName = 'Nama lengkap tidak boleh kosong';
                } else if (!/^[a-zA-Z ]+$/.test(values.fullName)) {
                    errors.fullName = 'Nama lengkap tidak valid';
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
                        <Field name={'fullName'}>
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.fullName &&
                                        form.touched.fullName
                                    }
                                >
                                    <FormLabel fontSize={'sm'}>
                                        Nama lengkap
                                    </FormLabel>
                                    <Input
                                        placeholder='e.g. Reza Pratama'
                                        {...field}
                                    />
                                    <FormErrorMessage>
                                        {form.errors.fullName}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name={'email'}>
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.email && form.touched.email
                                    }
                                >
                                    <FormLabel fontSize={'sm'}>
                                        Alamat email
                                    </FormLabel>
                                    <Input
                                        type='email'
                                        placeholder='e.g. name@email.com'
                                        {...field}
                                    />
                                    <FormErrorMessage>
                                        {form.errors.email}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

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
                    </Stack>

                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        fontSize={'sm'}
                        type={'submit'}
                        w={'full'}
                        mt={6}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        isLoading={props.isSubmitting}
                    >
                        Daftar
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;
