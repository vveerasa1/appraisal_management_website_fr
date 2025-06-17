import { Field, ErrorMessage } from 'formik';

export default function SelectInput({ label, name, options = [], placeholder= '', loading , isEdit}) {
  
  return (
    <div className={`${isEdit?'edit':""}form-group`}>
      <label className={`${isEdit?'edit':""}form-label`}>{label}</label>
      <Field as="select" name={name} className={`${isEdit?'edit':""}form-input`}>
       {loading ? (
          <option value="">Loading...</option>
        ) : (
          <>
            <option value="">---{placeholder}---</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="employee-form-error" />
    </div>
  );
}
