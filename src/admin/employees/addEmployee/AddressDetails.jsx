// 2. AddressDetails.jsx
import TextInput from "../../../components/common/TextInput";

const AddressDetails = () => (
  <div className="row">
    <div className="col-12">
      <h3 className="small-heading">Address Details</h3>
    </div>

    {[
      { label: "Address", name: "address", col: 6 },
      { label: "City", name: "city", col: 3 },
      { label: "Province", name: "province", col: 3 },
      { label: "Postal Code", name: "postalCode", col: 4 },
      { label: "Country", name: "country", col: 4 },
    ].map(({ label, name, col }) => (
      <div key={name} className={`col-12 col-md-6 col-lg-${col}`}>
        <TextInput
          label={label}
          name={name}
          type="text"
          placeholder=""
          isEdit={false}
        />
      </div>
    ))}
  </div>
);

export default AddressDetails;
