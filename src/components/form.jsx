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
    });

    const methods = useForm({
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
        setTab(1)
    };
    const array = [
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
    ]

    return (
        <section className="form-1">
            <div className="inner">
                <div className="form-wrap">
                    <FormProvider {...methods}>
                        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
                            {tab === 0 && (
                                <>
                                    <RHFTextfield
                                        className="input"
                                        name="url"
                                        placeholder="Enter URL"
                                        label='Enter URL'
                                    />
                                    <RHFTextfield
                                        className="input email-input"
                                        name="email"
                                        placeholder="Your Email"
                                    />
                                    <RHFSelect className='input' name='select' placeholder='placeholder' options={array}/>
                                    <button type="submit" className="submit-btn">
                                        Submit
                                    </button>
                                </>
                            )}
                            {tab === 0 && (
                                <>
                                    <RHFTextfield
                                        className="input"
                                        name="url"
                                        placeholder="Enter URL"
                                        label='Enter URL'
                                    />
                                    <RHFTextfield
                                        className="input email-input"
                                        name="email"
                                        placeholder="Your Email"
                                    />
                                    <RHFSelect className='input' name='select' placeholder='placeholder' options={array}/>
                                    <button type="submit" className="submit-btn">
                                        Submit
                                    </button>
                                </>
                            )}
                        
                            {tab === 1 && (
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
