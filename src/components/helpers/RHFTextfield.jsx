import { useFormContext } from "react-hook-form";

export default function RHFTextfield({ name, className, placeholder, label }) {
    const {
        register,
        formState: { errors },
    } = useFormContext(); // Access register and errors from the form context

    return (
        <>  
            <label className="input-label" for='name'>{label}</label>
            <input
                className={className}
                {...register(name)} // Properly register the input
                placeholder={placeholder}
                type="text"
                id={name}
                style={{ width: '100%' }}
            />
            {errors[name] && <p className="error-message">{errors[name]?.message}</p>} {/* Dynamically display errors */}
        </>
    );
}