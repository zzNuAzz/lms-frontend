/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Box,
  Container,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
  makeStyles,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SubjectRoundedIcon from "@material-ui/icons/SubjectRounded";

import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import BorderColorRoundedIcon from "@material-ui/icons/BorderColorRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import { toast } from "react-toastify";

import OverviewComponent from "../../../../Components/common-components/course-detail-components/overview-component/overview-component";
import AssignmentsComponent from "../../../../Components/common-components/course-detail-components/assignments-component/assignments-component";
import ForumComponent from "../../../../Components/common-components/course-detail-components/forum-component/forum-component";
import DocumentComponent from "../../../../Components/common-components/course-detail-components/document-component/document-component";
import getUserCourseList from "../../../../api/graphql/get-user-course-list";
import getAssignmentsList from "../../../../api/graphql/get-assignments-list";
import CourseMembersComponent from "../../../../Components/teacher-components/course-members-component/course-members-component";
import getCourseMemberList from "../../../../api/graphql/get-course-member-list";
import getCourseHost from "../../../../api/graphql/get-course-host";
import getCourseDetails from "../../../../api/graphql/get-course-details";
import toastFetchErrors from "../../../../Components/tools/toast-fetch-errors";
import EditCourseComponent from "../../../../Components/common-components/course-detail-components/edit-course-component/edit-course-component";
import enrollCourse from "../../../../api/graphql/enroll-course";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  tabs: {
    borderRight: "1px solid",
    borderRightColor: grey["300"],
  },
  tabButtonInactive: {
    display: "flex",
    alignItems: "center",
    padding: "10px 10px",
    width: "inherit",
    height: 50,
    cursor: "pointer",
    "&:hover": {
      background: grey["50"],
    },
  },
  tabButtonActive: {
    display: "flex",
    background: theme.palette.background.paper,
    color: theme.palette.primary.main,
    padding: "10px 10px",
    alignItems: "center",
    width: "inherit",
    height: 50,
    cursor: "pointer",
    borderLeft: "8px solid #2a73cc",
    fontWeight: "bolder",
  },
}));

const TeacherCourseDetailPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const { id } = useParams();
  const [isAccepted, setIsAccepted] = useState(false);

  const [tabPosition, setTabPosition] = useState("Course Info");
  const [courseList, setCourseList] = useState([]);
  const handleTabChange = (newTab) => {
    setTabPosition(newTab);
  };
  const [isSetted, setIsSetted] = useState(0);
  const handleEnroll = async () => {
    try {
      const result = await enrollCourse(parseInt(id, 10));
      // TODO
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        toast.success(
          "Your enroll request is sent to lecturer. Please wait to be accepted!",
          {
            autoClose: 5000,
          }
        );
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  };
  const fetchUserCourseList = async (pageNumber, pageSize) => {
    try {
      //* Fetch enrolled courses
      const result = await getUserCourseList({
        userId,
        status: "Accepted",
        pageNumber,
        pageSize,
      });
      const parsedResult = JSON.parse(result);
      // console.log({ parsedResult });
      // isHaveForum();
      if (parsedResult.data) {
        if (parsedResult.data.userCourseList.courseList.length !== 0) {
          setCourseList(parsedResult.data.userCourseList.courseList);
        } else {
          toast.error("You have no enrolled courses... :(");
        }
      } else {
        toastFetchErrors(parsedResult);
        // console.log({ parsedResult });
      }
    } catch (error) {
      toast(error);
    }
  };
  // console.log("Start");
  if (isSetted == 0 && courseList.length > 0) {
    setIsSetted(1);
    // console.log("List", courseList);
    courseList.map((course) => {
      if (course.courseId == id) {
        setIsAccepted(true);
      }
    });
  }
  useEffect(() => {
    const fetchContent = async () => {
      await fetchUserCourseList(0, 5);
    };
    fetchContent();
  }, []);

  // console.log({ courseList });
  // console.log({ id });

  const RenderComponent = (
    <div className={classes.root}>
      <Grid container direction="row" style={{ minHeight: "100vh" }}>
        <Grid className={classes.tabs} item md="2" sm="0">
          <Grid container direction="column" alignItems="flex-start">
            <Grid item style={{ width: "inherit" }}>
              <div
                role="tab"
                className={
                  tabPosition === "Course Info"
                    ? classes.tabButtonActive
                    : classes.tabButtonInactive
                }
                onClick={() => handleTabChange("Course Info")}
              >
                <div className="tab-item">
                  <SubjectRoundedIcon />
                  &nbsp; Course Info
                </div>
              </div>
            </Grid>
            <Grid item style={{ width: "inherit" }}>
              <div
                role="tab"
                className={
                  tabPosition === "Documents"
                    ? classes.tabButtonActive
                    : classes.tabButtonInactive
                }
                onClick={() => handleTabChange("Documents")}
              >
                <DescriptionRoundedIcon />
                &nbsp; Documents
              </div>
            </Grid>
            <Grid item style={{ width: "inherit" }}>
              <div
                role="tab"
                className={
                  tabPosition === "Assignments"
                    ? classes.tabButtonActive
                    : classes.tabButtonInactive
                }
                onClick={() => handleTabChange("Assignments")}
              >
                <BorderColorRoundedIcon />
                &nbsp; Assignments
              </div>
            </Grid>

            {isAccepted ? (
              <>
                <Grid item>
                  <Box ml={2} mt={2}>
                    <Divider variant="fullWidth" />
                    <Typography variant="body2" color="inherit">
                      Have any problem?
                    </Typography>
                  </Box>
                </Grid>
                <Grid item style={{ width: "inherit" }}>
                  <div
                    role="tab"
                    className={
                      tabPosition === "Forum"
                        ? classes.tabButtonActive
                        : classes.tabButtonInactive
                    }
                    onClick={() => handleTabChange("Forum")}
                  >
                    <Button variant="contained" color="primary" size="small">
                      Go To Forum
                    </Button>
                  </div>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Box ml={2} mt={2} mb={2}>
                    {/* <Divider variant="fullWidth" />
                    <Typography variant="body2" color="inherit">
                      Do you want to enroll?
                    </Typography> */}
                  </Box>
                </Grid>
                <Grid item style={{ width: "inherit" }}>
                  <Box mx={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleEnroll}
                    >
                      Enroll this course
                    </Button>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item md="10">
          <br />
          <Container maxWidth="md">
            {(() => {
              switch (tabPosition) {
                case "Course Info":
                  return (
                    <Paper elevation="3" style={{ padding: "20px 20px" }}>
                      <OverviewComponent courseId={id} />
                    </Paper>
                  );
                case "Documents":
                  return <DocumentComponent courseId={id} />;
                case "Assignments":
                  return <AssignmentsComponent courseId={id} />;
                case "Forum":
                  history.push(`/course/${id}/forum`);
                  break;
                default:
                  return null;
              }
            })()}
          </Container>
        </Grid>
      </Grid>
    </div>
  );

  return <>{RenderComponent}</>;
};

export default TeacherCourseDetailPage;
