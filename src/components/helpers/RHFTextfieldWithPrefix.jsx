/*
import { useFormContext } from "react-hook-form";

export default function RHFTextfield({ name, className, placeholder, label }) {
    const {
        register,
        formState: { errors },
    } = useFormContext(); // Access register and errors from the form context

    return (
        <>
            <div className="form-group" >
               {label ? <label className="input-label" for={name}>{label}</label> : '' }
                <input
                    className={className}
                    {...register(name)}
                    placeholder={placeholder}
                    type="text"
                    id={name}
                />
                {errors[name] && <p className="error-message" >{errors[name]?.message}</p>}
            </div>
        </>
    );
}
*/