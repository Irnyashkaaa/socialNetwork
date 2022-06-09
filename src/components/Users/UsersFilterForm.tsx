import React from "react";
import { Formik, Field, Form } from 'formik'


export let UsersFilterForm = (props) => {

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: '' }}

                onSubmit={(values, { setSubmitting }) => {
                    props.onFilterChanged(values)
                    setSubmitting(false);

                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="input" name="term" />
                        <Field as="select" name="friend">
                            <option value='null'>all</option>
                            <option value="true">only followed</option>
                            <option value='false'>only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
