import { Tab, TabPane } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { IProfile } from "../../app/models/profile.model";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";

interface Props {
  profile: IProfile;
}

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function ProfileContent({ profile }: Props) {
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <TabPane>Events content</TabPane> },
    {
      menuItem: "Followers",
      render: () => <TabPane>Followers content</TabPane>,
    },
    {
      menuItem: "Following",
      render: () => <TabPane>Following content</TabPane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
});
