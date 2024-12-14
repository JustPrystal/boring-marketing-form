import RHFTextfield from "../helpers/RHFTextfield";
import RHFSelect from "../helpers/RHFSelect";

export default function SecondStep({ selectItems, onSubmit, buttonClass, showNameField = true }) {
  const BudgetGrowthSelectItems = [
    { value: "<$10k", label: "<$10k" },
    { value: "$10k - $50k", label: "$10k - $50k" },
    { value: "$50k - $100k", label: "$50k - $100k" },
    { value: ">$100k", label: ">$100k" },
  ]
  return (
    <>
      {showNameField && (
        <RHFTextfield
          className="input"
          name="name"
          placeholder="Enter Full Name"
          label="Name"
        />
      )}
      <RHFTextfield
        className="input"
        name="company"
        placeholder="Ex; Boring Marketing .Co Ltd"
        label="Company Name"
      />
      <RHFSelect
        className="select-input"
        name="goal"
        placeholder="Your Team's Goals"
        options={selectItems}
        label="2025 Organic Growth Goal"
        defaultValue={[]}
        isMultiSelect={true}
        isSearchable={true}
      />
      <RHFTextfield
        isMoneyField={true}
        className="input dollar-field"
        name="revenue"
        placeholder="Enter Revenue Amount"
        label="Revenue Goals"
      />
      <RHFSelect
        className="select-input dollar-field"
        name="budget"
        isMoneyField={true}
        placeholder="Enter Estimated Growth Budget"
        options={BudgetGrowthSelectItems}
        label="Estimated Growth Budget / Month"
        defaultValue={[]}
      />

      <div className="btn-wrap">
        <button type="submit" className={`submit-btn ${buttonClass}`} onClick={onSubmit}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.92602 20.6699C8.38277 20.6699 7.83953 20.4661 7.41065 20.0295L3.12187 15.6635C2.29271 14.8194 2.29271 13.4223 3.12187 12.5782C3.95104 11.7341 5.32345 11.7341 6.15261 12.5782L8.92602 15.4016L18.8474 5.30153C19.6766 4.45743 21.049 4.45743 21.8781 5.30153C22.7073 6.14562 22.7073 7.54274 21.8781 8.38684L10.4414 20.0295C10.0411 20.4661 9.46927 20.6699 8.92602 20.6699Z"
              fill="currentColor"
            ></path>
          </svg>
          Submit
        </button>
      </div>
    </>
  );
};