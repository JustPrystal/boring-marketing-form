import { useEffect } from "react";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import SecondStep from "./secondStep";
import RHFTextfield from "../helpers/RHFTextfield";
import { sendToZapier } from "../../utils/sendToZapier";
import { updateStepUrl } from "../../utils/helper";
import CalendlyEmbed from "./Calendly-widget";

export default function KeywordRankingForm() {
  const [tab, setTab] = useState(0);

  const formSchema = yup.object({
    url: yup
      .string()
      .url("Please enter a valid URL.")
      .required("URL is required."),
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    goal:
      tab === 1
        ? yup
          .array()
          .of(yup.string().required("Goal is required"))
          .min(1, "At least one goal must be selected")
          .transform((value, originalValue) => {
            if (originalValue === "") {
              return [];
            }
            return value;
          })
        : yup.string(),
    company:
      tab === 1
        ? yup.string().required("Company name is required.")
        : yup.string(),
    name: tab === 1 ? yup.string().required("Name is required.") : yup.string(),
    revenue:
      tab === 1
        ? yup
          .number()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          )
          .typeError("Input must be a number")
          .required("Revenue amount is required")
        : yup.string(),
    budget:
      tab === 1
        ? yup.string().required("Growth budget is required")
        : yup.string(),
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

  useEffect(() => {
    updateStepUrl(tab);
  }, [tab]);

  const onSubmit = async (data) => {
    // Ensure the URL starts with https
    if (data.url && !data.url.startsWith("http")) {
      data.url = `https://${data.url}`;
    }

    console.log(data);

    // Prepare JSON data for the additional API call
    const jsonData = {
      email: data.email,
      competitor_url: data.url,
      name: data.name || null,
      company: data.company || null,
      growthGoal: data.goal || null,
      revenueGoal: data.revenue || null,
      estGrowthBudget: data.budget || null,
    };

    if (tab === 0) {
      try {
        // Make the additional API call using fetch
        const response = await fetch(
          "https://hkhc1rvaa6.execute-api.ap-south-1.amazonaws.com/prod/bm-freemium-competitor-keyword-ranking",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          }
        );

        if (response.ok) {
          console.log("Additional API call successful:", await response.text());
        } else {
          console.error(
            "Additional API call failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error making additional API call:", error);
      }
    }

    // Determine the API endpoint based on the tab and send data to Zapier
    switch (tab) {
      case 0:
        {
          const step1Object = {
            email: data.email,
            compURL: data.url,
            name: null,
            company: null,
            growthGoal: null,
            revenueGoal: null,
            estGrowthBudget: null,
          };
          sendToZapier(
            "https://hooks.zapier.com/hooks/catch/356942/2sw2c4p/",
            step1Object,
            1,
            setTab
          );
          fbq("track", "Lead rankingtool");

          break;
        }
      case 1:
        {
          const step2Object = {
            email: data.email,
            compURL: data.url,
            name: data.name,
            company: data.company,
            growthGoal: data.goal,
            revenueGoal: data.revenue,
            estGrowthBudget: data.budget,
          };
          sendToZapier(
            "https://hooks.zapier.com/hooks/catch/356942/2sw2c4p/",
            step2Object,
            2,
            setTab
          );

          fbq("track", "Details rankingtool");
          break;
        }
      default:
        break;
    }
  };

  const selectItems = [
    {
      value: "Drive more high-quality organic traffic",
      label: "Drive more high-quality organic traffic",
    },
    {
      value: "Reduce CAC and paid ad dependency",
      label: "Reduce CAC and paid ad dependency",
    },
    {
      value: "Build strong pipeline of high-quality leads",
      label: "Build strong pipeline of high-quality leads",
    },
    {
      value: "Identify demand to drive opportunities from new market",
      label: "Identify demand to drive opportunities from new market",
    },
    {
      value: "Other",
      label: "Other",
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
                  <RHFTextfield
                    isUrlField={true}
                    className="input url-input"
                    name="url"
                    placeholder="Paste URL"
                    label="Enter Competitor URL"
                  />
                  <RHFTextfield
                    isEmailField={true}
                    className="input email-input"
                    name="email"
                    placeholder="Your Email"
                    label="Enter Your Email Address"
                    onBlur={() => methods.trigger("email")}
                  />
                  <div className="btn-wrap">
                    <button type="submit" className="submit-btn">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.92602 20.6699C8.38277 20.6699 7.83953 20.4661 7.41065 20.0295L3.12187 15.6635C2.29271 14.8194 2.29271 13.4223 3.12187 12.5782C3.95104 11.7341 5.32345 11.7341 6.15261 12.5782L8.92602 15.4016L18.8474 5.30153C19.6766 4.45743 21.049 4.45743 21.8781 5.30153C22.7073 6.14562 22.7073 7.54274 21.8781 8.38684L10.4414 20.0295C10.0411 20.4661 9.46927 20.6699 8.92602 20.6699Z"
                          fill="currentColor"></path>
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
              {tab === 2 && <CalendlyEmbed tag="Calendly rankingtool" />}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
