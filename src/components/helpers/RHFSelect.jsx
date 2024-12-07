import { useFormContext } from "react-hook-form";

export default function RHFSelect({ name, className, options, placeholder, label }) {
    const {
        register,
        formState: { errors },
    } = useFormContext(); // Access register and errors from the form context

    return (
        <>
            <div className="form-group"  style={{ margin: '0 0 15px 0'}}>
                <label className="input-label" for='name'>{label}</label>
                <select
                    className={className}
                    {...register(name)} // Properly register the select field
                    style={{ width: '100%', padding: '15px' }}

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
                {errors[name] && <p className="error-message" style={{ color: '#cc0000' }} >{errors[name]?.message}</p>}
            </div>
        </>
    );
}