import React, { ReactNode } from 'react';
import { Tabs, Tab, Box, Container, Typography } from '@mui/material';

interface CustomTabProps {
  tabs: { value: ReactNode; content: ReactNode; label: string }[];
}

const CustomTab: React.FC<CustomTabProps> = ({ tabs }) => {
  const [value, setValue] = React.useState(tabs.length > 0 ? tabs[0].label : "");

  // Handle tab change
  const handleChange = (_event: React.ChangeEvent<object>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box>
        {/* Tabs Header */}
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map(({ label, value }) => (
            <Tab key={label} label={value} value={label} />
          ))}
        </Tabs>

        {/* Tab Content */}
        {tabs.map(({ content, label }) => (
          <TabPanel value={value} index={label} key={label}>
            {content}
          </TabPanel>
        ))}
      </Box>
    </Container>
  );
};

// Custom TabPanel component that renders content based on the active tab
interface TabPanelProps {
  value: string;
  index: string;
  children: ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default CustomTab;
