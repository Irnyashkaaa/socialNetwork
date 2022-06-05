import React from "react";
import s from './Login.module.css'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer.ts";


let validateEmail = (value: string) => {
  let error: string | null;
  if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  console.log(error);
  return error
}

let validatePassword = (value: string) => {
  let error: string;
  if (!value) {
    error = 'Empty field'
  }
  console.log(error)
  return error
}
let validateCheckbox = (value: boolean) => {
  console.log(value);
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

let LoginForm: React.FC<propsType> = (props) => {
  let navigate = useNavigate()
  let captcha = props.captchaUrl
  return (
    <div>
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
                <Field validate={validatePassword} name='captcha'/>
                </div>}
            </div>
            <div>
              <Field name="email" validate={validateEmail}
                className={(errors.email && touched.email)
                  ? s.errorValidate
                  : s.succesfullValidate} />
            </div>
            <div>
              <Field name="password" validate={validatePassword}
                className={(errors.password && touched.password)
                  ? s.errorValidate
                  : s.succesfullValidate} />
            </div>
            <div>
              <Field type="checkbox" name="rememberMe" validate={validateCheckbox}/> remember me
            </div>
            <button type="submit">SING IN</button>
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