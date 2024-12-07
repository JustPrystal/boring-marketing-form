import * as yup from "yup";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextfield from "./helpers/RHFTextfield";
import { useState } from "react";

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
        if (tab === 0) {
            setTab(1)
        }
        if (tab === 1) {
            setTab(2)
        }
        if (tab === 2) {
            setTab(3)
        }
        if (tab === 3) {
            setTab(4)
        }
        if (tab === 4) {
            setTab(5)
        }
        if (tab === 5) {
            setTab(6)
        }
    };

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
                                    />
                                    <RHFTextfield
                                        className="input email-input"
                                        name="email"
                                        placeholder="Your Email"
                                    />
                                    <button type="submit" className="submit-btn">
                                        Submit
                                    </button>
                                </>
                            )}
                            {tab === 1 && (
                                <>
                                    <RHFTextfield
                                        className="input"
                                        name="url"
                                        placeholder="Enter URL"
                                    />
                                    <RHFTextfield
                                        className="input email-input"
                                        name="email"
                                        placeholder="Your Email"
                                    />
                                    <button type="submit" className="submit-btn">
                                        Submit 2
                                    </button>
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
