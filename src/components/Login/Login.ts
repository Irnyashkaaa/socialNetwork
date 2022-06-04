import React from "react";
import s from './Login.module.css'
import {Formik, FormikHelpers, FormikProps, Form, Field, FieldProps,} from 'formik';
import { authAPI, profileAPI } from "../../api/api.ts";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";


let validateEmail = (value) => {
  let error;
  if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  console.log(error);
  return error
}

let validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Empty field'
  }
  console.log(error)
  return error
}
interface MyFormValues {

}

const LoginForm: React.FC<{}> = (props) => {
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
        onSubmit={values => {
          authAPI.login(values.email, values.password, values.remember, values.captcha)
            .then(response => {
              if (response.data.resultCode === 0) {
                authAPI.isUserAuth()
                  .then(response => {
                    if (response.data.resultCode === 0) {
                      profileAPI.getCurrentUser(response.data.data.id)
                      navigate('/profile')
                    }
                  })
              } else {
                alert(response.data.messages)
              }
            })
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
              <Field type="checkbox" name="remember" /> remember me
            </div>
            <button type="submit">SING IN</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

type mapStateToPropsType = {
  captchaUrl: string | null
}

let mapStateToProps = (state: any): mapStateToPropsType => ({
  captchaUrl: state.auth.captchaUrl
}
)
export const Login = connect<mapStateToPropsType>(mapStateToProps, {})(LoginForm)