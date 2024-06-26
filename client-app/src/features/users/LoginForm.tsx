import { ErrorMessage, Form, Formik } from "formik";
import DynamicTextInput from "../../app/common/form/DynamicTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(() => 
                setErrors({error: 'Invalid email or password'}))}>
                {({handleSubmit, isSubmitting, errors}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <Header as='h2' content='Login to Reactivities' color='teal' textAlign="center"/>
                        <DynamicTextInput placeholder='Email' name='email' />
                        <DynamicTextInput placeholder='Password' name='password' type='password' />
                        <ErrorMessage name='error' render={() => <Label style={{marginBottom: 10}} basic color="red" content={errors.error}/>} />
                        <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
                    </Form>
                )}
        </Formik>
    )
})