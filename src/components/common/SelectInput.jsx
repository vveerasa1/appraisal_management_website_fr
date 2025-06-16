import { Field, ErrorMessage } from 'formik';

export default function SelectInput({ label, name, options = [] }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <Field as="select" name={name} className="form-input">
        <option value="">---Select---</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
}
