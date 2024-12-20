import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import SecondStep from "./secondStep";
import RHFTextfield from "../helpers/RHFTextfield";
import TagInput from "../helpers/TagInput";
import { sendToZapier } from "../../utils/sendToZapier";
import CalendlyEmbed from "./Calendly-widget";
import { updateStepUrl } from "../../utils/helper";

export default function CompetitorWebsiteScrapperForm() {
  const [tab, setTab] = useState(0);
  const [urls, setUrls] = useState([]);

  function handleTabChange(tab) {
    setTab(tab);
  }

  const formSchema = yup.object({
    url: yup
      .array()
      .of(yup.string().url("Invalid URL").required("Each URL must be valid"))
      .min(1, "At least one URL is required")
      .required("At least one URL is required"), // Ensures the URL array is not empty
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Email is required"),
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
        ? yup.string().required("Company name is required")
        : yup.string(),
    name: tab === 1 ? yup.string().required("Name is required") : yup.string(),
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
      url: [],
      email: "",
      goal: "",
      company: "",
      name: "",
      revenue: "",
      budget: "",
    },
  });

  useEffect(() => {
    updateStepUrl(tab);
  }, [tab]);

  const onSubmit = async (data) => {
    if (data.url.length === 0) {
      methods.setError("url", { message: "At least one URL is required." });
      return;
    }

    const scrapingJsonData = {
      email: data.email,
      competitor_urls: data.url || [],
    };

    if (tab === 0) {
      try {
        // Make the scraping API call using fetch
        const scrapingResponse = await fetch(
          "https://p2k5lsh4pc.execute-api.ap-south-1.amazonaws.com/prod/bm-freemium-competitor-website-scapping",
          {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify(scrapingJsonData),
          }
        );

        if (scrapingResponse.ok) {
          console.log(
            "Scraping API call successful:",
            await scrapingResponse.text()
          );
        } else {
          console.error(
            "Scraping API call failed:",
            scrapingResponse.status,
            scrapingResponse.statusText
          );
        }
      } catch (error) {
        console.error("Error making scraping API call:", error);
      }
    }

    switch (tab) {
      case 0:
        {
          const step1Object = {
            email: data.email,
            compURLs: data.url,
            name: null,
            company: null,
            growthGoal: null,
            revenueGoal: null,
            estGrowthBudget: null,
          };
          sendToZapier(
            "https://hooks.zapier.com/hooks/catch/356942/2sk0oqt/",
            step1Object,
            1,
            setTab
          );

          // Fire Facebook Pixel Lead event when Step 1 form is submitted
          fbq("track", "Lead scraper"); // This will fire the "Lead" event
          break;
        }
      case 1:
        {
          const step2Object = {
            email: data.email,
            compURLs: data.url,
            name: data.name,
            company: data.company,
            growthGoal: data.goal,
            revenueGoal: data.revenue,
            estGrowthBudget: data.budget,
          };

          sendToZapier(
            "https://hooks.zapier.com/hooks/catch/356942/2sk0oqt/",
            step2Object,
            2,
            setTab
          );

          // Fire Facebook Pixel CompleteRegistration event when Step 2 form is submitted
          fbq("track", "Details scraper");

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
                      methods.setValue("url", newTags, {
                        shouldValidate: true,
                        shouldFocusError: true,
                      }); // Trigger validation and focus error
                    }}
                    className="input"
                    name="url"
                    methods={methods}
                    label="Enter Competitor URLs"
                    error={methods.formState.errors.url} // Pass the error here
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
              {tab === 2 && <CalendlyEmbed tag="Calendly scraper" />}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
