import { useFormContext } from "react-hook-form";

export default function RHFTextfield({ name, className, placeholder }) {
    const {
        register,
        formState: { errors },
    } = useFormContext(); // Access register and errors from the form context

    return (
        <>
            <input
                className={className}
                {...register(name)} // Properly register the input
                placeholder={placeholder}
                type="text"
                style={{ width: '100%' }}
            />
            {errors[name] && <p className="error-message">{errors[name]?.message}</p>} {/* Dynamically display errors */}
        </>
    );
}