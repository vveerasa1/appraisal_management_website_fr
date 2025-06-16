// 2. AddressDetails.jsx
import TextInput from "../../../components/common/TextInput";

const AddressDetails = ({isEdit}) => (
  <div className="row">
    <div className="col-12 col-md-12 col-lg-12">
      <h3 className="small-heading">Address Details</h3>
    </div>

    {[
      { label: "Address", name: "address", col: 6 },
      { label: "City", name: "city", col: 3 },
      { label: "Province", name: "province", col: 3 },
      { label: "Postal Code", name: "postalCode", col: 4 },
      { label: "Country", name: "country", col: 4 },
      { label: "Added By", name: "addedBy", type: "text", disabled: true ,col: 4 },
      { label: "Added Time", name: "addedTime", type: "text", disabled: true , col: 4 },
      {
        label: "Modified By",
        name: "modifiedBy",
        type: "text",
        disabled: true,
        col: 4 
      },
      {
        label: "Modified Time",
        name: "modifiedTime",
        type: "text",
        disabled: true,
        col: 4 
      },
    ].map(({ label, name, col, disabled }) => (
      <div key={name} className={`col-12 col-md-6 col-lg-${col}`}>
        <TextInput
          label={label}
          name={name}
          type="text"
          placeholder=""
          isEdit={isEdit}
          disabled={disabled}
        />
      </div>
    ))}
  </div>
);

export default AddressDetails;
