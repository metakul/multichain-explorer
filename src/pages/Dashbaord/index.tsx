import React from 'react';
import { Path, useNavigate } from 'react-router-dom';
import { EXPLORER_PAGE, PROJECTS } from '../../DataTypes/enums';
import HomeButton from '../../Components/UI/Typogrpahy/Buttons/HomeButton';
import { useRpc } from '../../contexts/RpcProviderContext';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const {networkName} = useRpc()

    const handleNavigation = (project: string | Partial<Path>) => {
        navigate(`${project}/${networkName}`);
    };

    return (
        <div>
            <h1>Welcome to Our Projects</h1>
            <div>
                <HomeButton onClick={() => handleNavigation(PROJECTS.CONTRACTS_HOME)}>
                Metakul Contracts
                </HomeButton>
            </div>
            <div className="projects">
                <HomeButton onClick={() => handleNavigation(EXPLORER_PAGE.EXPLORER_HOME)}>
                Metakul Explorer
                </HomeButton>
            </div>
            {/* <div className="projects">
                <HomeButton onClick={() => handleNavigation(PROJECTS.AI_PROJECT)}>
                    AI Project Home
                </HomeButton>
            </div> */}
        </div>
    );
};

export default Dashboard;
