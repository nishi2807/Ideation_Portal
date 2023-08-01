import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Manage() {
    const [ideas, setIdeas] = useState([]);
    const location = useLocation();
    const campid = new URLSearchParams(location.search).get('camp_id');
    const camptitle = new URLSearchParams(location.search).get('camp_title');
    const navigate = useNavigate();
    const [selectedIdeas, setSelectedIdeas] = useState([]);
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        const fetchTopVotedIdeas = async () => {
            try {
                const response = await axios.post(`http://localhost:8081/ideas/topVoted`, { camp_id: campid });
                const { ideas } = response.data;
                setIdeas(ideas);
            } catch (error) {
                console.error('Error retrieving top voted ideas:', error);
            }
        };

        fetchTopVotedIdeas();
    }, [campid]);

    useEffect(() => {
        console.log(token)
        if (token) {
            // Fetch the user's selected ideas using the provided token
            axios
                .post(`http://localhost:8081/fetch-user-selectedideas?token=${token}`, { token })
                .then((response) => {
                    const { userVotesResults } = response.data;
                    console.log(response.data)
                    const selectedIdeasIds = userVotesResults.map((result) => result.idea_id);
                    setSelectedIdeas(selectedIdeasIds);
                })
                .catch((error) => {
                    console.error('Error fetching user selected ideas:', error);
                });
        }
    }, [token]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substr(0, maxLength) + '...';
    };

    const handleReadMore = (ideaId) => {
        navigate(`/idea-content/${ideaId}`);
    };

    const CurrentUser_role = useSelector((state) => state.CurrentUser_role);

    const handleCheckboxChange = (ideaId) => {
        if (CurrentUser_role === 'admin') {
            // If the user is an admin, prevent any changes to the selected ideas
            return;
        }

        setSelectedIdeas((prevSelectedIdeas) => {
            if (prevSelectedIdeas.includes(ideaId)) {
                return prevSelectedIdeas.filter((id) => id !== ideaId);
            } else {
                return [...prevSelectedIdeas, ideaId];
            }
        });
    };

    const handleSubmitSelectedIdeas = () => {
        axios
            .post('http://localhost:8081/ideas/selectedIdeas', {
                token: token,
                ideas: selectedIdeas,
                camp_id: campid
            })
            .then((response) => {
                console.log('Selected ideas stored successfully:', response.data);
                alert("Selected Ideas are submitted successfully !")
                navigate(`/manage`);
                // Handle success
            })
            .catch((error) => {
                console.error('Error storing selected ideas:', error);
                // Handle error
            });
    };

    const goBack = () => {
        navigate(`/manage`); // Go back to the previous page
    };

    return (
        <div className='home-page'>
            <Navbar />
            <div className='main-form'>
                <div>
                    <h1 className='idea-heading'>Top 10 Voted Ideas</h1>
                </div>
                <div className='ideas-con'>
                    <table className='ideas-table'>
                        <thead className='theading'>
                            <tr>
                                <th>Idea Title</th>
                                <th>Idea Summary</th>
                                <th>Idea Implimentation</th>
                                <th>Rating</th>
                                <th>Select</th>
                                <th>Idea Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ideas.map((idea) => (
                                <tr key={idea.id}>
                                    <td className='title'>{truncateText(idea.idea_title, 40)}</td>
                                    <td className='summ'>{truncateText(idea.idea_summary, 50)}</td>
                                    <td className='descrip'>{truncateText(idea.idea_description, 50)}</td>
                                    <td>{idea.votes}</td>
                                    <td>
                                        <input
                                            type='checkbox'
                                            checked={selectedIdeas.includes(idea.id)}
                                            onChange={() => handleCheckboxChange(idea.id)}
                                        />
                                    </td>
                                    <td>
                                        <button className='read-more-btn' onClick={() => handleReadMore(idea.id)}>
                                            Click Here
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='submit-container'>
                    <button className={CurrentUser_role === "admin" ? 'submit-button' : 'mgoback-btn'} onClick={goBack}>Go Back</button>
                    {CurrentUser_role === "user" && (
                        <div>
                            <button className='submit-button' onClick={handleSubmitSelectedIdeas}>
                                Submit Selected Idea(s)
                            </button>
                            {/* <div className='ver-line'></div> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Manage;
