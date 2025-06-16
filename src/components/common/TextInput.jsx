import { Field, ErrorMessage } from 'formik';

export default function TextInput({ label, name, type = 'text', placeholder = '' }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <Field type={type} name={name} placeholder={placeholder} className="form-input" />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
}
