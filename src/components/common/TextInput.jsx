import { Field, ErrorMessage } from 'formik';

export default function TextInput({ label, name, type = 'text', placeholder = '',isEdit,disabled }) {
  return (
    <div className={`${isEdit?'edit':""}form-group`}>
      <label className={`${isEdit?'edit':""}form-label`}>{label}</label>
      <Field type={type} name={name} placeholder={placeholder} className={`${isEdit?'edit':""}form-input`} disabled={disabled}/>
      <ErrorMessage name={name} component="div" className="employee-form-error" />
    </div>
  );
}
