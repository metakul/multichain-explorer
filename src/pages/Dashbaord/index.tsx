import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../../DataTypes/enums';
import HomeButton from '../../Components/Typogrpahy/Buttons/HomeButton';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(PROJECTS.CONTRACTS_HOME);
    };

    return (
        <div>
            <h1>Welcome to Our Projects</h1>
            <div>
                <HomeButton onClick={handleNavigation}>C3I Contract Home</HomeButton>
            </div>
            <div className="projects">
                <HomeButton onClick={handleNavigation}>C3I Explorer</HomeButton>
            </div>
        </div>
    );
};

export default Dashboard;
