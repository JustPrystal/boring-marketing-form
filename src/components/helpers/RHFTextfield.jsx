import React from 'react';
import { useFormContext,} from "react-hook-form";

export default function RHFTextfield({ name, className, placeholder, label, isMoneyField = false, isUrlField = false, isEmailField = false }) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    setFocus,
  } = useFormContext(); // Access register and errors from the form context

  const handleBlurEmail = async () => {
    if (name === "email") {
      // Trigger validation for the email field
      await trigger(name); // Validate the field
    }
  };
  const handleBlur = async () => {
    let url = getValues(name); // Get the current value of the field
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/; // Basic URL validation pattern

    if (url && !url.startsWith("http://") && !url.startsWith("https://") && urlPattern.test(url)) {
      url = `https://${url}`;
      setValue(name, url, { shouldValidate: true }); // Update the field and trigger validation
    } else {
      await trigger(name); // Trigger validation if the URL is not valid
    }
  };

  return (
    <>
      <div className="form-group" >
        {label ? <label className="input-label" for={name}>{label}</label> : ''}
        {isMoneyField ? (
          <div className="money-input-wrap">
            <input
              className={className}
              {...register(name)}
              placeholder={placeholder}
              type="text"
              id={name}
            />
          </div>
        ) : isUrlField ? (
          <input
            className={className}
            {...register(name)}
            placeholder={placeholder}
            type="text"
            id={name}
            onBlur={handleBlur}
          />
        ) : isEmailField ? (
          <input
            className={className}
            {...register(name)}
            placeholder={placeholder}
            type="text"
            id={name}
            onBlur={handleBlurEmail}
          />
        ) : (
          <input
            className={className}
            {...register(name)}
            placeholder={placeholder}
            type="text"
            id={name}
          />
        )}
        {errors[name] && <p className="error-message" >{errors[name]?.message}</p>}
      </div>
    </>
  );
}