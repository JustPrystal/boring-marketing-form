import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

export default function Form() {
    const formSchema = yup.object({
        url: yup.string().url("Invalid URL").required("URL is required"),
        email: yup.string().email("Invalid email address").required("Email is required"),
    });

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <section className="form-1">
                <div className="inner">
                    <div className="form-wrap">
                        <form className="form" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                className="input url-input"
                                {...register('url')}
                                placeholder="Enter URLs, separated by commas or spaces."
                                type="url"
                            />
                            <p>{errors.url?.message}</p>
                            <input
                                className="input email-input"
                                {...register('email')}
                                placeholder="Your Email"
                                type="email"
                            />
                            <p>{errors.email?.message}</p>
                            <button type="submit" className="submit-btn"></button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
