import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import RHFTextfield from "./helpers/RHFTextfield";
import RHFSelect from "./helpers/RHFSelect";
import TagInput from "./helpers/TagInput";

export default function Form() {
  const [tab, setTab] = useState(0);
  const [urls, setUrls] = useState([]);

  const formSchema = yup.object({
    url: yup
      .array()
      .of(yup.string().url("Invalid URL"))
      .required("At least one URL is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    goal: tab === 1 ? yup.string().required("Goal is required") : yup.string(),
    company: tab === 1 ? yup.string().required("Company name is required") : yup.string(),
    name: tab === 1 ? yup.string().required("Name is required") : yup.string(),
    revenue: tab === 1 ? yup.string().required("Revenue amount is required") : yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      url: [],
      email: "",
      goal: "",
      revenue: "",
    },
  });

  const onSubmit = (data) => {
    switch (tab) {
      case 0:
        setTab(1);
        break;
      case 1:
        setTab(2);
        console.log(data);
        switch (tab) {
            case 0:
                setTab(1);
                break;
                case 1:
                    const inputs = document.querySelectorAll('.dollar-field');
                    console.log(inputs);
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
        <section className="form-1">
            <div className="inner">
                <div className="form-wrap">
                    <FormProvider {...methods}>
                        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
              {tab === 0 && (
                <>
                  <TagInput onTagsChange={setUrls} className='input' /> {/* Integrate the TagInput component */}
                  <RHFTextfield className="input email-input" name="email" placeholder="Your Email" label="Enter Your Email Address" />
                  <div className="btn-wrap">
                    <button type="submit" className="submit-btn" style={{ display: "flex", alignItems: "center" }}>
                      Continue
                  </div>
                    </button>
                </>
              )}
                            {tab === 1 && (
                                <>
                                    <RHFTextfield
                                        className="input"
                                        name="name"
                                        placeholder="Enter Full Name"
                                        label='Name'
                                    />
                                    <RHFTextfield
                                        className="input email-input"
                                        name="company"
                                        placeholder="Ex; Boring Marketing .Co Ltd"
                                        label='Company Name'
                                    />
                                    <RHFSelect className='input' name='goal' placeholder="Your Team's Goals" options={selectItems} label='2025 Organic Growth goal' />
                                   <div className="prepend-wrap">
                                        <RHFTextfield className='input dollar-field' name="revenue" placeholder="Enter Revenue Amount" label='Revenue goals'/>
                                   </div>
                                    <div className="prepend-wrap">
                                        <RHFTextfield className='input dollar-field' name="budget" placeholder="Enter Estimated Growth Budget" label='Estimated growth budget / month' />
                                    </div>
                                    <div className="btn-wrap">
                                        <button type="submit" className="submit-btn" >
                                            Submit
                                        </button>
                                    </div>
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
