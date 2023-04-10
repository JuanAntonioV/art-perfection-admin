import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Link as ChakraLink,
    Button,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
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

                if (
                    values.email !== 'admin@email.com' ||
                    values.password !== 'admin123'
                ) {
                    errors.email = 'Email atau password salah';
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

                        <Stack spacing={6}>
                            <Stack
                                direction={{
                                    base: 'column',
                                    sm: 'row',
                                }}
                                align={'start'}
                                justify={'end'}
                            >
                                <ChakraLink
                                    color={'blue.400'}
                                    fontSize={'sm'}
                                    to='/forgot-password'
                                    as={Link}
                                >
                                    Lupa password?
                                </ChakraLink>
                            </Stack>

                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                fontSize={'sm'}
                                type={'submit'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                isLoading={props.isSubmitting}
                            >
                                Masuk
                            </Button>
                        </Stack>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
