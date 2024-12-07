import { useFormContext } from "react-hook-form";

export default function RHFTextfield({ name, className, placeholder, label }) {
    const {
        register,
        formState: { errors },
    } = useFormContext(); // Access register and errors from the form context

    return (
        <>
            <div className="form-group" style={{ margin: '0 0 15px 0' }}>
                <label className="input-label" for='name'>{label}</label>
                <input
                    className={className}
                    {...register(name)}
                    placeholder={placeholder}
                    type="text"
                    id={name}
                    style={{ width: '100%', padding: '15px' }}
                />
                {errors[name] && <p className="error-message" style={{ color: '#cc0000' }}>{errors[name]?.message}</p>}
            </div>
        </>
    );
}