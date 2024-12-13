/*
import { useFormContext, Controller } from "react-hook-form";
    import Select from 'react-select';

    export default function RHFSelect({ name, className, options, placeholder, label }) {
        const {
            control,
            formState: { errors },
        } = useFormContext(); // Access register and errors from the form context

        return (
            <>
                <div className="form-group">
                    <label className="input-label" for={name}>{label}</label>
                    <Controller
                        name={name}
                        control={control}
                        rules={{ required: "Goal is required" }}
                        render={({ field }) => (
                            <Select
                                isMulti
                                {...field}
                                className={className}
                                options={options}
                                placeholder={placeholder}
                                classNamePrefix="custom"
                                onChange={(selected) => {
                                    field.onChange(selected.map((option) => option.value)); // Map selected options to their values
                                }}
                                value={options.filter((option) => field.value?.includes(option.value))} // Sync selected options with form state
                            />
                        )}
                    />
                    {errors[name] && <p className="error-message"  >{errors[name]?.message}</p>}
                </div>
            </>
        );
    }
*/