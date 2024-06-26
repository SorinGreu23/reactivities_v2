import { observer } from "mobx-react-lite";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity.model";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useStore } from "../../../app/stores/store";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const {
    activityStore: { updateAttendance, loading, cancelActivityToggle },
    userStore: {user}
  } = useStore();

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {activity.isCanceled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Canceled"
          />
        )}
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date!, "dd MMMM yyyy")}</p>
                <p>
                  Hosted by{" "}
                  <strong>
                    <Link to={`/profiles/${activity.host?.username}`}>
                      {activity.host?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost && activity.host?.username === user?.username ? (
          <>
            <Button
              color={activity.isCanceled ? "green" : "red"}
              floated="left"
              basic
              content={
                activity.isCanceled ? "Re-activate Activity" : "Cancel Activity"
              }
              onClick={cancelActivityToggle}
              loading={loading}
            />
            <Button
              disabled={activity.isCanceled}
              as={Link}
              to={`/manage/${activity.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          </>
        ) : activity.isGoing ? (
          <Button onClick={updateAttendance} loading={loading}>
            Cancel attendance
          </Button>
        ) : (
          <Button
            disabled={activity.isCanceled}
            onClick={updateAttendance}
            loading={loading}
            color="teal"
          >
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
