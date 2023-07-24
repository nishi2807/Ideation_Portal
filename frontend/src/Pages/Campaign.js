import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './Campaign.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Campaign() {
    const Navigate = useNavigate();

    const logout = () => {
        Navigate('/');
    }

    const home = () => {
        Navigate('/home');
    }

    const createGroup = () => {
        Navigate('/create-group');
    }

    const initiate_camp = () => {
        Navigate('/initiate-campaign')
    }

    const CurrentUser_name = useSelector((state) => state.CurrentUser_name);
    // console.log(CurrentUser_name)
    const [campaignData, setCampaignData] = useState([]);

    useEffect(() => {
        // Fetch campaign data from the server using Axios
        axios.post('http://localhost:8081/get-user-campaigns', { name: CurrentUser_name })
            .then(response => {
                // Filter out duplicate camp_ids using reduce
                const uniqueCampaigns = response.data.reduce((acc, campaign) => {
                    if (!acc.find(item => item.camp_id === campaign.camp_id)) {
                        acc.push(campaign);
                    }
                    return acc;
                }, []);

                setCampaignData(uniqueCampaigns);
                console.log(uniqueCampaigns); // Check the received data in the console
            })
            .catch(error => {
                console.error('Error fetching campaign data:', error);
            });
    }, [CurrentUser_name]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const isCampaignClosed = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        return end < today;
    };

    return (
        <div className='home-page'>
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" onClick={home}>Home</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" style={{ color: '#FFa559' }}>Campaigns</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Ideation</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Voting</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Management</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">About Us</p>
                <hr className="hori-line"></hr>
                <p className="menu-content">Settings</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={logout}>LogOut</p>
            </div>
            <div className='main-content'>
                <button className='create-group' onClick={createGroup}>Create New Group</button>
                <button className='ini-camp' onClick={initiate_camp}>Initiate Campaign</button>
                <div className='ver-line'></div>
                <div className='camp-content'>
                    <table className='camp-table'>
                        <thead>
                            <tr>
                                <th>Campaign Id</th>
                                <th>Campaign Owner</th>
                                <th>Campaign Title</th>
                                <th>No.of Users</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaignData.map((campaign) => (
                                <tr key={campaign.camp_id}>
                                    <td>{campaign.camp_id}</td>
                                    <td className='camp-con-owner'>{campaign.camp_owner}</td>
                                    <td className='camp-con-title'>{campaign.camp_title}</td>
                                    <td>{campaign.camp_users}</td>
                                    <td>{formatDate(campaign.camp_startdate)}</td>
                                    <td>{formatDate(campaign.camp_enddate)}</td>
                                    <td className={isCampaignClosed(campaign.camp_enddate) ? 'closed' : 'open'}>
                                        {isCampaignClosed(campaign.camp_enddate) ? 'Closed' : 'Open'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Campaign;