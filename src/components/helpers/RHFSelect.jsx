import { useFormContext } from "react-hook-form";

export default function RHFSelect({ name, className, options, placeholder }) {
    const {
        register,
        formState: { errors },
    } = useFormContext(); // Access register and errors from the form context

    return (
        <>
            <select
                className={className}
                {...register(name)} // Properly register the select field
                style={{ width: '100%' }}
            >
                {placeholder && (
                    <option className="placeholder" value="" disabled selected hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && <p className="error-message">{errors[name]?.message}</p>} {/* Dynamically display errors */}
        </>
    );
}