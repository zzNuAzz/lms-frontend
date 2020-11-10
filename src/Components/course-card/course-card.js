import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  //* Basic properties
  border-radius: 4px;
  background: #fff;
  // box-shadow: 0 6px 10px rgba(0, 0, 0, .08), 0 0 6px rgba(0, 0, 0, .05);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: .3s transform cubic-bezier(.155, 1.105, .295, 1.12), .3s box-shadow, .3s -webkit-transform cubic-bezier(.155, 1.105, .295, 1.12);
  // padding: 14px 80px 18px 36px;
  padding: 30px 30px;
  padding-right: 80px;
  cursor: pointer;

  //* Background properties
  background-image: url('https://ionicframework.com/img/getting-started/components-card.png');
  background-repeat: no-repeat;
  background-position: right;
  background-size: 80px;

  //* On hover action
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

const Title = styled.div`
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;
const Subtitle = styled.div`
`;

// eslint-disable-next-line import/prefer-default-export
export const CourseCard = ({ title, id }) => (
  <>
    <Card>
      <Title>{title}</Title>
      <Subtitle>{id}</Subtitle>
    </Card>
  </>
);
