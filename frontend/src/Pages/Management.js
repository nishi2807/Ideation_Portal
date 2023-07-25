import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Management() {
    const Navigate = useNavigate();
    const logout = () => {
        Navigate('/');
    }

    const home = () => {
        Navigate('/home');
    }

    const ideation = () => {
        Navigate('/ideation');
    }

    const voting = () => {
        Navigate('/voting')
    }

    const campaign = () => {
        Navigate('/campaign');
    }

    const CurrentUser_name = useSelector((state) => state.CurrentUser_name)
    const [campaignData, setCampaignData] = useState([]);

    useEffect(() => {
        // Fetch campaign data and token from the server using Axios
        axios.post('http://localhost:8081/get-user-manage', { name: CurrentUser_name })
            .then(response => {
                // Filter out duplicate camp_ids using reduce
                const uniqueCampaigns = response.data.reduce((acc, campaign) => {
                    if (!acc.find(item => item.camp_id === campaign.camp_id)) {
                        acc.push(campaign);
                    }
                    return acc;
                }, []);

                // Fetch the token for each campaign using another Axios request
                Promise.all(uniqueCampaigns.map(campaign => {
                    return axios.post('http://localhost:8081/get-campaign-token', { camp_id: campaign.camp_id, name: CurrentUser_name })
                        .then(tokenResponse => {
                            // Attach the token to the campaign data
                            campaign.token = tokenResponse.data.token;
                            return campaign;
                        })
                        .catch(error => {
                            console.error('Error fetching token:', error);
                            return campaign;
                        });
                }))
                    .then(updatedCampaigns => {
                        setCampaignData(updatedCampaigns);
                    })
                    .catch(error => {
                        console.error('Error fetching campaign data:', error);
                    });
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

    const openCampaigns = campaignData.filter(campaign => !isCampaignClosed(campaign.manage_enddate));

    const handleGetDetails = (token, encodedCampTitle, camp_id) => {
        // Navigate to the specified page with the received token and camp_id
        Navigate(`/management?token=${token}&camp_title=${encodedCampTitle}&camp_id=${camp_id}`);
    };

    return (
        <div className='home-page'>
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" onClick={home}>Home</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={campaign}>Campaigns</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={ideation}>Ideation</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={voting}>Voting</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" style={{ color: '#FFa559' }}>Management</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={logout}>LogOut</p>
            </div>
            <div className='main-content'>
                <div>
                    <h1 className='i-title'>Management Group Campaigns</h1>
                </div>
                <div>
                    <table className='camp-table'>
                        <thead>
                            <tr>
                                <th>Campaign Id</th>
                                <th>Campaign Owner</th>
                                <th>Campaign Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                {/* <th>Status</th> */}
                                <th>Get Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openCampaigns.map((campaign) => (
                                <tr key={campaign.camp_id}>
                                    <td>{campaign.camp_id}</td>
                                    <td className='campidea-user'>{campaign.camp_owner}</td>
                                    <td className='campidea'>{campaign.camp_title}</td>
                                    <td>{formatDate(campaign.vote_enddate)}</td>
                                    <td>{formatDate(campaign.manage_enddate)}</td>
                                    {/* <td className={isCampaignClosed(campaign.camp_enddate) ? 'closed' : 'open'}>
                                        {isCampaignClosed(campaign.camp_enddate) ? 'Closed' : 'Open'}
                                    </td> */}
                                    <td>
                                        <button className="read-more-btn" onClick={() => handleGetDetails(campaign.token, campaign.camp_title, campaign.camp_id)}>
                                            Click Here
                                        </button>
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

export default Management;