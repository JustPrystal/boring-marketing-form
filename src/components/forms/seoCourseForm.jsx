import * as yup from "yup";
import { useForm, FormProvider, } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import SecondStep from "./secondStep";
import RHFTextfield from "../helpers/RHFTextfield";

export default function SEOCourseForm() {
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
    budget: tab === 1 ? yup.string().required("Growth budget is required") : yup.string(),
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
        const step1Object = {
          email: data.email,
          name: null,
          companyName: null,
          growthGoal: null,
          revenueGoal: null,
          estGrowthBudget: null
        }
        sendToZapier('https://hooks.zapier.com/hooks/catch/356942/2swecao/', step1Object, 1, setTab)
        break;
      case 1:
        const step2Object = {
          email: data.email,
          name: data.name,
          companyName: data.company,
          growthGoal: data.goal,
          revenueGoal: data.revenue,
          estGrowthBudget: data.budget
        }
        sendToZapier('https://hooks.zapier.com/hooks/catch/356942/2swecao/', step2Object, 2, setTab)
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
                  <iframe src="https://calendly.com/boringmarketing/boringmarketing-com-30min-demo-call " height={1000}></iframe>
                </>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}