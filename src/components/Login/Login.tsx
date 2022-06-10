import React from "react";
import s from './Login.module.css'
import { Form, Input, Checkbox, SubmitButton} from 'formik-antd'
import { Formik} from 'formik'
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer.ts";


const validateEmail = (value: string) => {
  let error: string | null;
  if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error
}

const validatePassword = (value: string) => {
  let error: string;
  if (!value) {
    error = 'Empty Input'
  }
  return error
}

type propsType = {
  captchaUrl: string
}

type onSubmitType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string | undefined | null
}

const LoginForm: React.FC<propsType> = (props) => {
  let navigate = useNavigate()
  let captcha = props.captchaUrl
  return (
    <div  style={{ width: 304 }}>
      <h1>LOGIN</h1>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        onSubmit={(values: onSubmitType) => {
          login(values.email, values.password, values.rememberMe, values.captcha)
          navigate('/profile')
        }}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <div>
              {captcha && <div>
                <img src={captcha} />
                <Input validate={validatePassword} name='captcha'/>
                </div>}
            </div>
            <div>
              <Input name="email" validate={validateEmail}
                className={(errors.email && touched.email)
                  ? s.errorValidate
                  : s.succesfullValidate} />
            </div>
            <div>
              <Input name="password" validate={validatePassword}
                className={(errors.password && touched.password)
                  ? s.errorValidate
                  : s.succesfullValidate} />
            </div>
            <div>
              <Checkbox type="checkbox" name="rememberMe"/> remember me
            </div>
            <SubmitButton >SING IN</SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}




let mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl
}
)
export const Login = connect (mapStateToProps, {})(LoginForm)