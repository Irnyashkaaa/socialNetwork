import React from "react";
import { Formik} from 'formik'
import { Form, Input, SubmitButton, Select} from 'formik-antd'
import {SearchOutlined} from '@ant-design/icons'


export let UsersFilterForm = (props) => {

    let {Option} = Select

    return (
        <div style={{width: 300}}>
            <Formik
                initialValues={{ term: '', friend: '' }}

                onSubmit={(values, { setSubmitting }) => {
                    props.onFilterChanged(values)
                    setSubmitting(false);

                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Input placeholder="find users..." type="input" name="term" />
  
                        <Select defaultValue={null} style={{width: 150}} name="friend">
                            <Option value='null'>all</Option>
                            <Option value="true">only followed</Option>
                            <Option value='false'>only unfollowed</Option>
                        </Select>
                        <SubmitButton type="primary" icon={<SearchOutlined />} disabled={isSubmitting}>
                            search
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
