import { useFormContext, Controller } from "react-hook-form";
import Select from 'react-select';

export default function RHFSelect({ name, className, options, placeholder, label, isMultiSelect = false, isSearchable = false }) {
    const {
      control,
      formState: { errors },
    } = useFormContext(); // Access register and errors from the form context
  
    return (
      <>
        <div className="form-group">
          <label className="input-label" for={name}>{label}</label>
          <Controller
            name={name}
            control={control}
            rules={{ required: "Goal is required" }}
            render={({ field }) => (
              <Select
              isMulti={isMultiSelect} // No need for ternary operator, true/false will work directly
              {...field}
              className={className}
              options={options}
              placeholder={placeholder}
              isSearchable={isSearchable} 
              classNamePrefix="custom"
              onChange={(selected) => {
                if (isMultiSelect) {
                  // For multi-select: map selected options to their values
                  field.onChange(selected.map((option) => option.value));
                } else {
                  // For single-select: just return the selected value
                  field.onChange(selected ? selected.value : null);
                }
              }}
              value={isMultiSelect 
                ? options.filter((option) => field.value?.includes(option.value)) // For multi-select
                : options.find((option) => option.value === field.value) // For single-select
              }
              />
            )}
          />
          {errors[name] && <p className="error-message"  >{errors[name]?.message}</p>}
        </div>
      </>
    );
  }