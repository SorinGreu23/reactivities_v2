import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if(activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  if(activityStore.loadingInitial) return <LoadingComponent  content="Loading activities..."/>

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
});
