import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/sass/styles.scss'
import * as yup from "yup";
import { useForm, FormProvider, useFormContext, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Select from 'react-select';


/*Helpers*/
function RHFTextfield({ name, className, placeholder, label, isMoneyField = false, isUrlField = false, isEmailField = false }) {
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
function TagInput({ onTagsChange, className, name, label, error }) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [inputError, setInputError] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputError("");
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      createTags(inputValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        createTags(inputValue);
      }
    }
  };

  const createTags = (value) => {
    const rawTags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const validTags = rawTags.map((tag) => isValidUrl(tag)).filter((tag) => tag !== null);

    if (validTags.length < rawTags.length) {
      setInputError("Please enter a valid URL.");
    } else {
      setInputError(""); // Clear error if all URLs are valid
    }

    if (validTags.length > 0) {
      setTags((prevTags) => [...prevTags, ...validTags]);
      setInputValue("");
      onTagsChange([...tags, ...validTags]);

      methods.clearErrors("url");
    }
  };

  const isValidUrl = (string) => {
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?/;
    const match = string.match(pattern);
    if (match) {
      const cleanUrl = match[0].split('?')[0]; // Remove everything after the first ?
      return cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`;
    }
    return null;
  };

  const handleTagRemove = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onTagsChange(newTags);
  };


  return (
    <div className="form-group">
      <div className="tag-input-wrap">
        {label ? <label className="input-label" for={name}> {label}</label> : ''}
        <input
          type="text"
          className={className}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          placeholder="Enter URLs, separated by commas or spaces."
          name={name}
        />
      </div>
      {/* Display error message from react-hook-form if it exists */}
      {error && !inputError && <p className="error-message">{error.message}</p>}

      {/* Display input-specific error (e.g., URL error) only if there is no react-hook-form error */}
      {inputError && <p className="error-message">{inputError}</p>}
      {tags.length > 0 && (
        <div className="url-input-wrap">
          {tags.map((tag, index) => (
            <div key={index} className="url-input">
              <span className="url-input-text">{tag}</span>
              <button type="button" className="url-input-cross" onClick={() => handleTagRemove(tag)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11" viewBox="0 0 12 11" fill="none" >
                  <line x1="1.14648" y1="10.6464" x2="11.1464" y2="0.646442" stroke="black" />
                  <line x1="0.853584" y1="0.646447" x2="10.8535" y2="10.6464" stroke="black" />
                </svg>
              </button>
            </div>
          ))}

        </div>
      )}
    </div>

  );
};
function RHFSelect({ name, className, options, placeholder, label }) {
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
              isMulti
              {...field}
              className={className}
              options={options}
              placeholder={placeholder}
              classNamePrefix="custom"
              onChange={(selected) => {
                field.onChange(selected.map((option) => option.value)); // Map selected options to their values
              }}
              value={options.filter((option) => field.value?.includes(option.value))} // Sync selected options with form state
            />
          )}
        />
        {errors[name] && <p className="error-message"  >{errors[name]?.message}</p>}
      </div>
    </>
  );
}
/*end-Helpers*/

function SecondStep({ selectItems, onSubmit, buttonClass, showNameField = true }) {
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
      />
      <RHFTextfield
        isMoneyField={true}
        className="input dollar-field"
        name="revenue"
        placeholder="Enter Revenue Amount"
        label="Revenue Goals"
      />
      <RHFTextfield
        isMoneyField={true}
        className="input dollar-field"
        name="budget"
        placeholder="Enter Estimated Growth Budget"
        label="Estimated Growth Budget / Month"
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

/*forms*/
function Form() {
  const [tab, setTab] = useState(0);
  const [urls, setUrls] = useState([]);
  
  function handleTabChange (tab) {
    setTab(tab)
  }

  const formSchema = yup.object({
    url: yup.array().of(yup.string().url("Invalid URL").required("Each URL must be valid")).min(1, "At least one URL is required").required("At least one URL is required"), // Ensures the URL array is not empty
    email: yup.string().email("Please enter a valid email address.").required("Email is required"),
    goal: tab === 1 ? yup.array().of(yup.string().required("Goal is required")).min(1, "At least one goal must be selected").transform((value, originalValue) => {
      if (originalValue === "") {
        return [];
      }
      return value;
    }) : yup.string(),
    company: tab === 1 ? yup.string().required("Company name is required") : yup.string(),
    name: tab === 1 ? yup.string().required("Name is required") : yup.string(),
    revenue: tab === 1 ? yup.number().nullable().transform((value, originalValue) => originalValue === "" ? null : value).typeError("Input must be a number").required("Revenue amount is required") : yup.string(),
    budget: tab === 1 ? yup.number().nullable().transform((value, originalValue) => originalValue === "" ? null : value).typeError("Input must be a number").required("Growth budget is required") : yup.string(),
  });
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      url: [],
      email: "",
      goal: "",
      company: "",
      name: "",
      revenue: "",
      budget: "",
    },
  });

  const onSubmit = (data) => {
    if (data.url.length === 0) {
      methods.setError("url", { message: "At least one URL is required." });
      return;
    }
    console.log(data);
    // If validation passes, proceed with form submission
    switch (tab) {
      case 0:
        const step1Object = {
          email: data.email,
          compURLs: data.url,
          name: null,
          company: null,
          growthGoal: null,
          revenueGoal: null,
          estGrowthBudget: null
        }
        sendToZapier('https://hooks.zapier.com/hooks/catch/356942/2sk0oqt/', step1Object, 1, setTab)

        break;
      case 1:
        const step2Object = {
          email: data.email,
          compURLs: data.url,
          name: data.name,
          company: data.company,
          growthGoal: data.goal,
          revenueGoal: data.revenue,
          estGrowthBudget: data.budget
        }
        sendToZapier('https://hooks.zapier.com/hooks/catch/356942/2sk0oqt/', step2Object, 2, setTab)
        break;
      default:
        break;
    }
  };

  const selectItems = [
    { value: "Drive more high-quality organic traffic", label: "Drive more high-quality organic traffic" },
    { value: "Reduce CAC and paid ad dependency", label: "Reduce CAC and paid ad dependency" },
    { value: "Build strong pipeline of high-quality leads", label: "Build strong pipeline of high-quality leads" },
    { value: "Identify demand to drive opportunities from new market", label: "Identify demand to drive opportunities from new market" },
    { value: "Other", label: "Other" },
  ];

  return (
    <section className="form-1">
      <div className="inner">
        <div className="form-wrap">
          <FormProvider {...methods}>
            <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
              {tab === 0 && (
                <>
                  <TagInput
                    onTagsChange={(newTags) => {
                      setUrls(newTags);
                      methods.setValue("url", newTags, { shouldValidate: true, shouldFocusError: true }); // Trigger validation and focus error
                    }}
                    className="input"
                    name="url"
                    label="Enter Competitor URLs"
                    error={methods.formState.errors.url} // Pass the error here
                  />
                  <RHFTextfield isEmailField={true} className="input email-input" name="email" placeholder="Your Email" label="Enter Your Email Address" onBlur={() => methods.trigger('email')} />
                  <div className="btn-wrap">
                    <button type="submit" className="submit-btn" >
                      <svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.92602 20.6699C8.38277 20.6699 7.83953 20.4661 7.41065 20.0295L3.12187 15.6635C2.29271 14.8194 2.29271 13.4223 3.12187 12.5782C3.95104 11.7341 5.32345 11.7341 6.15261 12.5782L8.92602 15.4016L18.8474 5.30153C19.6766 4.45743 21.049 4.45743 21.8781 5.30153C22.7073 6.14562 22.7073 7.54274 21.8781 8.38684L10.4414 20.0295C10.0411 20.4661 9.46927 20.6699 8.92602 20.6699Z" fill="currentColor"></path>
                      </svg>
                      Get Free Alerts
                    </button>
                  </div>
                </>
              )}
              {tab === 1 && (
                <>
                  <SecondStep
                    selectItems={selectItems}
                    onSubmit={methods.handleSubmit(onSubmit)}
                  />
                </>
              )}
              {tab === 2 && (
                <>
                  <p>step 3 </p>
                </>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </section >
  );
}
function KeywordRankingForm() {
  const [tab, setTab] = useState(0);

  const formSchema = yup.object({
    url: yup.string().url("Please enter a valid URL.").required("URL is required."),
    email: yup.string().email("Please enter a valid email address.").required("Email is required."),
    goal: tab === 1 ? yup.array().of(yup.string().required("Goal is required")).min(1, "At least one goal must be selected").transform((value, originalValue) => {
      if (originalValue === "") {
        return [];
      }
      return value;
    }) : yup.string(),
    company: tab === 1 ? yup.string().required('Company name is required.') : yup.string(),
    name: tab === 1 ? yup.string().required('Name is required.') : yup.string(),
    revenue: tab === 1 ? yup.number().nullable().transform((value, originalValue) => originalValue === "" ? null : value).typeError("Input must be a number").required("Revenue amount is required") : yup.string(),
    budget: tab === 1 ? yup.number().nullable().transform((value, originalValue) => originalValue === "" ? null : value).typeError("Input must be a number").required("Growth budget is required") : yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      url: "",
      email: "",
      goal: "",
      revenue: "",
      budget: "",
    },
  });


  const onSubmit = (data) => {
    if (data.url && !data.url.startsWith("http")) {
      data.url = `https://${data.url}`;
    }
    console.log(data);
    switch (tab) {
      case 0:
        const step1Object = {
          email: data.email,
          compURL: data.url,
          name: null,
          company: null,
          growthGoal: null,
          revenueGoal: null,
          estGrowthBudget: null,
        }
        sendToZapier('https://hooks.zapier.com/hooks/catch/356942/2sw2c4p/', step1Object, 1, setTab)

        break;
      case 1:
        const step2Object = {
          email: data.email,
          compURL: data.url,
          name: data.name,
          company: data.company,
          growthGoal: data.goal,
          revenueGoal: data.revenue,
          estGrowthBudget: data.budget,
        }
        sendToZapier('https://hooks.zapier.com/hooks/catch/356942/2sw2c4p/', step2Object, 2, setTab)

        break;
      default:
        break;
    }
  };

  const selectItems = [
    {
      value: 'Drive more high-quality organic traffic',
      label: 'Drive more high-quality organic traffic',
    },
    {
      value: 'Reduce CAC and paid ad dependency',
      label: 'Reduce CAC and paid ad dependency',
    },
    {
      value: 'Build strong pipeline of high-quality leads',
      label: 'Build strong pipeline of high-quality leads',
    },
    {
      value: 'Identify demand to drive opportunities from new market',
      label: 'Identify demand to drive opportunities from new market',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

  return (
    <section className="form-1 keyword-ranking-form">
      <div className="inner">
        <div className="form-wrap">
          <FormProvider {...methods}>
            <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
              {tab === 0 && (
                <>
                  <RHFTextfield isUrlField={true} className="input url-input" name="url" placeholder="Paste URL" label='Enter Competitor URL' />
                  <RHFTextfield isEmailField={true} className="input email-input" name="email" placeholder="Your Email" label="Enter Your Email Address" onBlur={() => methods.trigger('email')} />
                  <div className="btn-wrap">
                    <button type="submit" className="submit-btn" >
                      <svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.92602 20.6699C8.38277 20.6699 7.83953 20.4661 7.41065 20.0295L3.12187 15.6635C2.29271 14.8194 2.29271 13.4223 3.12187 12.5782C3.95104 11.7341 5.32345 11.7341 6.15261 12.5782L8.92602 15.4016L18.8474 5.30153C19.6766 4.45743 21.049 4.45743 21.8781 5.30153C22.7073 6.14562 22.7073 7.54274 21.8781 8.38684L10.4414 20.0295C10.0411 20.4661 9.46927 20.6699 8.92602 20.6699Z" fill="currentColor"></path>
                      </svg>
                      Get Free Keywords
                    </button>
                  </div>
                </>
              )}
              {tab === 1 && (
                <>
                  <SecondStep
                    selectItems={selectItems}
                    onSubmit={methods.handleSubmit(onSubmit)}
                  />
                </>
              )}
              {tab === 2 && (
                <>
                  <p>step 3</p>
                </>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
function ToolkitForm() {
  const [tab, setTab] = useState(0);
  const [urls, setUrls] = useState([]);

  const formSchema = yup.object({
    name: tab === 0 ? yup.string().required("Name is required") : yup.string(),
    url: yup.string().url("Please enter a valid URL.").required("URL is required."),
    email: yup.string().email("Please enter a valid email address.").required("Email is required"),
    goal: tab === 1 ? yup.array().of(yup.string().required("Goal is required")).min(1, "At least one goal must be selected").transform((value, originalValue) => {
      if (originalValue === "") {
        return [];
      }
      return value;
    }) : yup.string(),
    company: tab === 1 ? yup.string().required("Company name is required") : yup.string(),
    revenue: tab === 1 ? yup.number().nullable().transform((value, originalValue) => originalValue === "" ? null : value).typeError("Input must be a number").required("Revenue amount is required") : yup.string(),
    budget: tab === 1 ? yup.number().nullable().transform((value, originalValue) => originalValue === "" ? null : value).typeError("Input must be a number").required("Growth budget is required") : yup.string(),
  });
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      email: "",
      goal: "",
      company: "",
      revenue: "",
      budget: "",
    },
  });

  const onSubmit = (data) => {
    if (data.url && !data.url.startsWith("http")) {
      data.url = `https://${data.url}`;
    }
    console.log(data);
    // If validation passes, proceed with form submission
    switch (tab) {
      case 0:
        setTab(1);
        break;
      case 1:
        setTab(2);
        break;
      default:
        break;
    }
  };

  const selectItems = [
    { value: "Drive more high-quality organic traffic", label: "Drive more high-quality organic traffic" },
    { value: "Reduce CAC and paid ad dependency", label: "Reduce CAC and paid ad dependency" },
    { value: "Build strong pipeline of high-quality leads", label: "Build strong pipeline of high-quality leads" },
    { value: "Identify demand to drive opportunities from new market", label: "Identify demand to drive opportunities from new market" },
    { value: "Other", label: "Other" },
  ];

  return (
    <section className="form-3">
      <div className="inner">
        <div className="form-wrap">
          <FormProvider {...methods}>
            <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
              {tab === 0 && (
                <>
                  <RHFTextfield
                    className="input"
                    name="name"
                    label="Name"
                  />
                  <RHFTextfield isUrlField={true} className="input url-input" name="url" label='Company Website' />
                  <RHFTextfield isEmailField={true} className="input email-input" name="email" label="Work Email" onBlur={() => methods.trigger('email')} />
                  <div className="btn-wrap">
                    <button type="submit" className="submit-btn third-button" >
                      Get The Toolkit Now
                    </button>
                  </div>
                </>
              )}
              {tab === 1 && (
                <>
                  <SecondStep
                    showNameField={false}
                    selectItems={selectItems}
                    onSubmit={methods.handleSubmit(onSubmit)}
                    buttonClass="third-button"
                  />
                </>
              )}
              {tab === 2 && (
                <>
                  <p>step 3 </p>
                </>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </section >
  );
}
function SecondForm() {
  const [tab, setTab] = useState(0);

  const formSchema = yup.object({
    email: yup.string().email("Please enter a valid email address.").required("Email is required."),
    goal: tab === 1 ? yup.array().of(yup.string().required("Goal is required")).min(1, "At least one goal must be selected").transform((value, originalValue) => {
      if (originalValue === "") {
        return [];
      }
      return value;
    }) : yup.string(),
    company: tab === 1 ? yup.string().required('Company name is required.') : yup.string(),
    name: tab === 1 ? yup.string().required('Name is required.') : yup.string(),
    revenue: tab === 1 ? yup.number().nullable().transform((value, originalValue) => originalValue === "" ? null : value).typeError("Input must be a number").required("Revenue amount is required") : yup.string(),
    budget: tab === 1 ? yup.number().nullable().transform((value, originalValue) => originalValue === "" ? null : value).typeError("Input must be a number").required("Growth budget is required") : yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      goal: "",
      company: "",
      name: "",
      revenue: "",
      budget: "",
    },
  });


  const onSubmit = (data) => {
    if (data.url && !data.url.startsWith("http")) {
      data.url = `https://${data.url}`;
    }
    console.log(data);
    switch (tab) {
      case 0:
        setTab(1);
        break;
      case 1:
        setTab(2);
        break;
      default:
        break;
    }
  };

  const selectItems = [
    {
      value: 'Drive more high-quality organic traffic',
      label: 'Drive more high-quality organic traffic',
    },
    {
      value: 'Reduce CAC and paid ad dependency',
      label: 'Reduce CAC and paid ad dependency',
    },
    {
      value: 'Build strong pipeline of high-quality leads',
      label: 'Build strong pipeline of high-quality leads',
    },
    {
      value: 'Identify demand to drive opportunities from new market',
      label: 'Identify demand to drive opportunities from new market',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

  return (
    <section className="form-2">
      <div className="inner">
        <div className="form-wrap">
          <FormProvider {...methods}>
            <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
              {tab === 0 && (
                <>
                  <RHFTextfield isEmailField={true} className="input email-input" name="email" placeholder="Your Primary email" onBlur={() => methods.trigger('email')} />
                  <div className="btn-wrap">
                    <button type="submit" className="submit-btn" >
                      Get Started With SEO 2.0 - It’s FREE
                    </button>
                  </div>
                </>
              )}
              {tab === 1 && (
                <>
                  <SecondStep
                    selectItems={selectItems}
                    onSubmit={methods.handleSubmit(onSubmit)}
                    buttonClass="second-button"
                  />
                </>
              )}
              {tab === 2 && (
                <>
                  <p>step 3</p>
                </>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
/*end-forms*/


// api functions

const sendToZapier = async (url, bodyData, nextTab, setTab) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Success:', data);

    // Set the next tab once the request is successful
    setTab(nextTab);
  } catch (error) {
    console.error('Error:', error);
    // Handle the error case, e.g., show an error message to the user
  }
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form />
    <KeywordRankingForm />
    <ToolkitForm />
    <SecondForm />
  </StrictMode>,
)
