import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}

export default function DynamicTextInput(props: Props) {
    const [field, meta] = useField(props.name);

    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label as='p' basic color="red" style={{ marginLeft: -8, border: 'none'}}>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}