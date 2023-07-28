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

    const ideation = () => {
        Navigate('/ideation');
    }

    const voting = () => {
        Navigate('/voting');
    }

    const manage = () => {
        Navigate('/manage')
    }

    const createGroup = () => {
        Navigate('/create-group');
    }

    // const initiate_camp = () => {
    //     Navigate('/initiate-campaign')
    // }

    const CurrentUser_name = useSelector((state) => state.CurrentUser_name);
    const CurrentUser_role = useSelector((state) => state.CurrentUser_role)
    // console.log(CurrentUser_name)
    const [campaignData, setCampaignData] = useState([]);

    console.log(campaignData)

    useEffect(() => {
        // Fetch campaign data and token from the server using Axios
        axios.post('http://localhost:8081/get-user-campaigns', { name: CurrentUser_name })
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



    const closedCampaigns = campaignData.filter(campaign => isCampaignClosed(campaign.manage_enddate));
    const allCampaigns = CurrentUser_role === 'admin' ? campaignData : closedCampaigns;

    const handleGetDetails = (token, encodedCampTitle, camp_id) => {
        // Navigate to the specified page with the received token and camp_id
        Navigate(`/all-ideas?token=${token}&camp_title=${encodedCampTitle}&camp_id=${camp_id}`);
    };

    return (
        <div className='home-page'>
            <Navbar></Navbar>
            <div className="menu">
                <p className="menu-content" onClick={home}>Home</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" style={{ color: '#FFa559' }}>Campaigns</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={ideation}>Ideation</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={voting}>Voting</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={manage}>Management</p>
                <hr className="hori-line"></hr>
                <p className="menu-content" onClick={logout}>LogOut</p>
            </div>
            <div className='main-content'>
                {/* <button className='create-group' onClick={createGroup}>Create New Group</button> */}
                {CurrentUser_role === "admin" && (
                    <div>
                        <button className='create-group' onClick={createGroup}>Initiate Campaign</button>
                        {/* <div className='ver-line'></div> */}
                    </div>
                )}
                {/* <div className='ver-line'></div> */}
                <h1 className= 'pastcamp-title-user'>
                    {CurrentUser_role === "admin" ? "All Campaigns" : "Your Past Campaigns"}
                </h1>
                <div className={CurrentUser_role === "admin" ? 'camp-content' : 'camp-content-user'}>
                    <table className={CurrentUser_role === "admin" ? 'camps-table' : 'camps-table-user'}>
                        <thead>
                            <tr>
                                <th>Camp Id</th>
                                <th>Campaign Owner</th>
                                <th>Campaign Title</th>
                                <th>Users</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                {CurrentUser_role === "admin" && <th>Status</th>}
                                <th>Get Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCampaigns.map((campaign) => (
                                <tr key={campaign.camp_id}>
                                    <td>{campaign.camp_id}</td>
                                    <td className={CurrentUser_role === "admin" ? 'camp-con-owner' : 'camp-con-onweruser'}>{campaign.camp_owner}</td>
                                    <td className={CurrentUser_role === "admin" ? 'camp-con-title' : 'camp-con-titleuser'}>{campaign.camp_title}</td>
                                    <td>{campaign.camp_users}</td>
                                    <td>{formatDate(campaign.camp_startdate)}</td>
                                    <td>{formatDate(campaign.manage_enddate)}</td>
                                    {CurrentUser_role === "admin" && <td className={isCampaignClosed(campaign.manage_enddate) ? 'closed' : 'open'}>{isCampaignClosed(campaign.manage_enddate) ? 'Closed' : 'Open'}</td>}
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

export default Campaign;