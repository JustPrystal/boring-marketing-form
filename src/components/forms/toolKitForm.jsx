import React from 'react';
import * as yup from "yup";
import { useForm, FormProvider, } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import SecondStep from "./secondStep";
import RHFTextfield from "../helpers/RHFTextfield";
import { sendToZapier } from '../../utils/sendToZapier';

export default function ToolkitForm() {
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
    budget: tab === 1 ? yup.string().required("Growth budget is required") : yup.string(),
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
        const step1Object = {
          name: data.name,
          companyWebsite: data.url,
          workEmail: data.email,
          companyName: null,
          growthGoal: null,
          revenueGoal: null,
          estGrowthBudget: null
        }
        sendToZapier('https://hooks.zapier.com/hooks/catch/356942/2swkam2/', step1Object, 1, setTab)
        break;
      case 1:
        const step2Object = {
          name: data.name,
          companyWebsite: data.url,
          workEmail: data.email,
          companyName: data.company,
          growthGoal: data.goal,
          revenueGoal: data.revenue,
          estGrowthBudget: data.budget
        }
        sendToZapier('https://hooks.zapier.com/hooks/catch/356942/2swkam2/', step2Object, 2, setTab)
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
                  <iframe src="https://calendly.com/boringmarketing/boringmarketing-com-30min-demo-call " height={380}></iframe>
                </>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </section >
  );
}