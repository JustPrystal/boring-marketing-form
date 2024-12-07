import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextfield from "./helpers/RHFTextfield";
import { useState } from "react";
import RHFSelect from "./helpers/RHFSelect";

export default function Form() {
    const [tab, setTab] = useState(0);

    const formSchema = yup.object({
        url: yup.string().url("Invalid URL").required("URL is required"),
        email: yup.string().email("Invalid email address").required("Email is required"),
        goal: tab === 1 ? yup.string().required('Goal is required') : yup.string(),
        company: tab === 1 ? yup.string().required('Company name is required') : yup.string(),
        name: tab === 1 ? yup.string().required('Name is required') : yup.string(),
        revenue: tab === 1 ? yup.string().required('Revenue amount is required') : yup.string(),
    });

    const methods = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            url: "",
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
        <section className="form-1">
            <div className="inner">
                <div className="form-wrap">
                    <FormProvider {...methods}>
                        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
                            {tab === 0 && (
                                <>
                                    <RHFTextfield
                                        className="input url-input"
                                        name="url"
                                        placeholder="Enter URL"
                                        label='Enter URLs, separated by commas or spaces.'
                                    />
                                    <RHFTextfield
                                        className="input email-input"
                                        name="email"
                                        placeholder="Your Email"
                                        label="Enter Your Email Address"
                                    />
                                    <div className="btn-wrap">
                                        <button type="submit" className="submit-btn" style={{ display: 'flex', alignItems: 'center' }}>
                                            Continue
                                        </button>
                                    </div>
                                </>
                            )}
                            {tab === 1 && (
                                <>
                                    <RHFTextfield
                                        className="input"
                                        name="name"
                                        placeholder="Enter Full Name"
                                        label='Enter Full Name'
                                    />
                                    <RHFTextfield
                                        className="input email-input"
                                        name="company"
                                        placeholder="Ex; Boring Marketing .Co Ltd"
                                        label='Enter Company Name'
                                    />
                                    <RHFSelect className='input' name='goal' placeholder="Your Team's Goals" options={selectItems} label='2025 Organic Growth goal' />
                                    <RHFTextfield className='input' name="revenue" placeholder="Enter Revenue Amount" label='Estimated growth budget / month' />
                                    <div className="btn-wrap">
                                        <button type="submit" className="submit-btn" style={{ display: 'flex', alignItems: 'center' }}>
                                            <svg width="25px" height="25px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.92602 20.6699C8.38277 20.6699 7.83953 20.4661 7.41065 20.0295L3.12187 15.6635C2.29271 14.8194 2.29271 13.4223 3.12187 12.5782C3.95104 11.7341 5.32345 11.7341 6.15261 12.5782L8.92602 15.4016L18.8474 5.30153C19.6766 4.45743 21.049 4.45743 21.8781 5.30153C22.7073 6.14562 22.7073 7.54274 21.8781 8.38684L10.4414 20.0295C10.0411 20.4661 9.46927 20.6699 8.92602 20.6699Z" fill="currentColor"></path>
                                            </svg>
                                            Get Free Alerts
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
