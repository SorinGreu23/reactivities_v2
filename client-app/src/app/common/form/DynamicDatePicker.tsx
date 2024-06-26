import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';


export default function DynamicDatePicker(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);

    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
                {...field} 
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label as='p' basic color="red" style={{ marginLeft: -8, border: 'none'}}>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}