import React, { ReactNode, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
interface MobileTabNavigationProps {
  tabs: { value: ReactNode; content: ReactNode; label: string }[];
  position?: string;
  showOutlet?: boolean;
  orientation?:string
}

const MobileTabNavigation: React.FC<MobileTabNavigationProps> = ({ tabs, position, showOutlet, orientation }) => {
  useEffect(() => {
    if (showOutlet) {
      setValue(0);
    }
  }, [showOutlet, tabs]);

  const [value, setValue] = React.useState(0);
  const isNonMobile = useMediaQuery("(min-width: 766px)");
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box   sx={{ flexGrow: 1, display: orientation=="vertical" ? 'flex' : 'block',
      height:orientation=="vertical" ? "100vh" : "",
     }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="mobile tabs"
        variant="scrollable"
         orientation={orientation=="vertical" ? "vertical" : "horizontal"}
        scrollButtons="auto"
        sx={{
          color: "black",
          borderRight:orientation=="vertical" ? "2px solid" : "",
          pr:4
        }}
      >
        {tabs.map(({ value }, index) => (
          <Tab
            key={index}
            icon={React.createElement('div', null, value)}
            {...a11yProps(index)}
            sx={{
              '&.Mui-selected': {
                backgroundColor:orientation=="vertical"? "green" :"grey",
                color: "black",
                '& .MuiSvgIcon-root': {
                  fontSize: "2rem",
                },
              },
            }}
          />
        ))}
      </Tabs>
      {tabs.map(({ content }, index) => (
        <CustomTabPanel isNonMobile={isNonMobile} key={index} value={value} position={position} index={index}>
          {content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

interface CustomTabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
  isNonMobile: boolean;
  position?: string;
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ isNonMobile, children, value, index, position }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    style={{
    }}
  >
    {value === index && <Box className={` ${position === "top" ? "pt-2" : ""}`} sx={{ pl: isNonMobile ? 3 : 0 }}>{children}</Box>}
  </div>
);

export default MobileTabNavigation;