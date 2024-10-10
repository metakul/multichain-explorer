import React from 'react';
import { Path, useNavigate } from 'react-router-dom';
import { EXPLORER, PROJECTS } from '../../DataTypes/enums';
import HomeButton from '../../Components/Typogrpahy/Buttons/HomeButton';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (project: string | Partial<Path>) => {
        navigate(project);
    };

    return (
        <div>
            <h1>Welcome to Our Projects</h1>
            <div>
                <HomeButton onClick={() => handleNavigation(PROJECTS.CONTRACTS_HOME)}>
                    C3I Contract Home
                </HomeButton>
            </div>
            <div className="projects">
                <HomeButton onClick={() => handleNavigation(EXPLORER.EXPLORER_HOME)}>
                    C3I Explorer
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
