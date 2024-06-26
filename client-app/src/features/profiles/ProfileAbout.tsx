import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useState } from "react";
import { Button, Grid, GridColumn, Header, TabPane } from "semantic-ui-react";
import ProfileEditForm from "./ProfileEditForm";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ProfileAbout() {
  const { profileStore } = useStore();
  const { isCurrentUser, profile } = profileStore;
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile?.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </GridColumn>
        <GridColumn width={16}>
          {editMode ? (
            <ProfileEditForm setEditMode={setEditMode} />
          ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
});
