import { observer } from "mobx-react-lite";
import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import DynamicTextInput from "../../app/common/form/DynamicTextInput";
import DynamicTextArea from "../../app/common/form/DynamicTextArea";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();

  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => {
        updateProfile(values).then(() => {
          setEditMode(false);
        });
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <DynamicTextInput placeholder="Display Name" name="displayName" />
          <DynamicTextArea placeholder="Add your bio" name="bio" rows={3} />
          <Button
            positive
            type="submit"
            loading={isSubmitting}
            content="Update profile"
            floated="right"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
});
