import React from 'react';
import { Path, useNavigate } from 'react-router-dom';
import { EXPLORER_PAGE, PROJECTS } from '../../DataTypes/enums';
import HomeButton from '../../Components/UI/Typogrpahy/Buttons/HomeButton';
import { useRpc } from '../../contexts/RpcProviderContext';
import Container from '../../Components/UI/Container';
import { getColors } from '../../layout/Theme/themes';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const {networkName} = useRpc()

    const handleNavigation = (project: string | Partial<Path>) => {
        navigate(`${project}/${networkName}`);
    };

    return (
        <Container sx={{
        }}>
            <h1>Welcome to Our Projects</h1>
            <div>
                <HomeButton onClick={() => handleNavigation(PROJECTS.CONTRACTS_HOME)} sx={{
                    color:getColors().grey[100],
                    fontSize:"14px"
                }}>
                Our Top Contracts
                </HomeButton>
            </div>
            <div className="projects">
                <HomeButton onClick={() => handleNavigation(EXPLORER_PAGE.EXPLORER_HOME)} sx={{
                    color:getColors().grey[100],
                    fontSize:"14px"

                }}>
                Multichain Explorer
                </HomeButton>
            </div>
            {/* <div className="projects">
                <HomeButton onClick={() => handleNavigation(PROJECTS.AI_PROJECT)}>
                    AI Project Home
                </HomeButton>
            </div> */}
            <img style={{
                width:"100%",
                height:"auto"
            }} src="development.webp"/>

        </Container>
    );
};

export default Dashboard;
