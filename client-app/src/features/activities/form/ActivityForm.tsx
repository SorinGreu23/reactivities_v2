import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../app/models/activity.model";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik } from "formik";
import * as Yup from 'yup';
import {v4 as uuid} from 'uuid';
import DynamicTextInput from "../../../app/common/form/DynamicTextInput";
import DynamicTextArea from "../../../app/common/form/DynamicTextArea";
import DynamicSelectInput from "../../../app/common/form/DynamicSelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import DynamicDatePicker from "../../../app/common/form/DynamicDatePicker";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
  const {id} = useParams();
  const navigate = useNavigate();

  const[activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required("Category is required"),
    date: Yup.string().required("Date is required"),
    city: Yup.string().required("City is required"),
    venue: Yup.string().required("Venue is required")
  })

  useEffect(() => {
    if(id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
  }, [id, loadActivity])

  function handleFormSubmit(activity: ActivityFormValues) {
    if(!activity.id) {
      const newActivity = {...activity, id: uuid()}
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  }

  if(loadingInitial) return <LoadingComponent content="Loading activity..."/>

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal"/>
      <Formik 
        validationSchema={validationSchema}
        enableReinitialize 
        initialValues={activity} 
        onSubmit={values => handleFormSubmit(values)}>
        {({handleSubmit, isValid, isSubmitting, dirty}) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <DynamicTextInput name="title" placeholder="Title" />
            <DynamicTextArea name="description" placeholder="Description" rows={3} />
            <DynamicSelectInput name="category" placeholder="Category" options={categoryOptions} />
            <DynamicDatePicker 
              name="date" 
              placeholderText="Date" 
              showTimeSelect
              timeCaption="time"
              dateFormat='MMMM d, yyyy h:mm aa'
            />
            <Header content="Location Details" sub color="teal"/>
            <DynamicTextInput name="city" placeholder="City" />
            <DynamicTextInput name="venue" placeholder="Venue" />
            <Button 
              disabled={isSubmitting || !dirty || !isValid} 
              loading={isSubmitting} 
              floated="right" positive type="submit" content="Submit" />
            <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
      
    </Segment>
  );
});
