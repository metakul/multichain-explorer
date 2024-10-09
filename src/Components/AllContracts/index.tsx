import React from 'react';
import { VerificationProps } from '../../interfaces/CompInterfaces';
import { Container } from '@radix-ui/themes';
import CustomHeading from '../Typogrpahy/Text/Heading';
import DataGrid from '../DataGrid';
import { GridApiProps } from '../../interfaces/Api/getGridData';
import { userMockData } from '../../MockData';

const MyContracts: React.FC<VerificationProps> = (props) => {
 
  const columns = ['Full Name', 'Email', 'Group']; 

  // todo: choose VerificationData to update based on permission
  
  const renderUserRow = (user: GridApiProps) => ({
    'Full Name': user.fullName,
    'Email': user.email,
    'Group': user.group,      
  });
  
  return (
    <Container>
        <CustomHeading placeholder={props.pageTitle} />
        <DataGrid columns={columns} data={userMockData.map(renderUserRow)} />
    </Container>
  );
};

export default MyContracts;
