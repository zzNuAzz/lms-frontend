//! DO.NOT.READ.THIS.CODE!!!
//! IT.IT.VERY.UNOPTIMIZED.AND.REQUIRES.REFACTOR...
//! (but it still runs fast tho...)
//! "PROUDLY".WRITTEN.BY.NHAT.LE.QUANG...
import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { toast } from 'react-toastify';
import MemberStatusButton from './member-status-button/member-status-button';
import updateCourseMember from '../../../api/graphql/update-course-member';

const CourseMembersComponent = ({ enrolledMembers, pendingMembers, rejectedMembers, fetchAllMembers }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  //* Current member id for menu (different scope and is required for status update)
  const [currentMemberId, setCurrentMemberId] = useState();

  const handleStatusButtonClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentMemberId(parseInt(id, 10));
    console.log(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (event) => {
    const { status } = event.currentTarget.dataset;
    setLoading(true);
    const result = await updateCourseMember(currentMemberId, status);
    const parsedResult = JSON.parse(result);
    if (parsedResult.data) {
      if (parsedResult.data.updateCourseMember.success) {
        fetchAllMembers();
      } else {
        toast(`Cannot update status for course member with id ${currentMemberId}.`, {
          type: 'error',
          autoClose: 3000,
        });
      }
      setLoading(false);
    }
    handleClose();
  };

  // TODO: Show member's profile pic instead of icons.
  const MemberRows = (members, status) => {
    return members.map((member) => (
      <TableRow hover>
        <TableCell>{member.courseMemberId}</TableCell>
        <TableCell>{member.user.firstName || 'No Firstname'}</TableCell>
        <TableCell>{member.user.lastName || 'No Lastname'}</TableCell>
        <TableCell>{member.user.username}</TableCell>
        <TableCell>
          <MemberStatusButton
            status={status}
            onClick={(event) => handleStatusButtonClick(event, member.courseMemberId)}
          />
        </TableCell>
      </TableRow>
    ));
  };

  const RenderComponent = (
    <>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        // Render Menu under current button
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem data-status="Accepted" onClick={(event) => handleStatusChange(event)}>Accepted</MenuItem>
        <MenuItem data-status="Pending" onClick={(event) => handleStatusChange(event)}>Pending</MenuItem>
        <MenuItem data-status="Rejected" onClick={(event) => handleStatusChange(event)}>Rejected</MenuItem>
      </Menu>
      <Typography variant="h4">Enrolled Members</Typography>
      <br />
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Enroll Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MemberRows(enrolledMembers, 'Accepted')}
            {MemberRows(pendingMembers, 'Pending')}
            {MemberRows(rejectedMembers, 'Rejected')}
          </TableBody>
        </Table>
      </Paper>
    </>
  );

  return (
    <>
      {RenderComponent}
    </>
  );
};

export default CourseMembersComponent;
