import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: relative;
`;
const ListElement = styled.div`
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }

  &:active {
    transition: 0.15s;
    transform: scale(1);
  }
`;
const Title = styled.div`
  padding: 10px 10px;
`;

// eslint-disable-next-line import/prefer-default-export
export const CourseListElement = ({ title }) => (
  <Wrapper>
    <ListElement>
      <Title>
        <Typography variant="h5">
          <span role="img" aria-label="emoji-book">
            📖
          </span>
          &nbsp;
          {title}
        </Typography>
      </Title>
    </ListElement>
  </Wrapper>
);
