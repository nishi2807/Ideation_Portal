import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Manage() {

    const [ideas, setIdeas] = useState([]);
    const location = useLocation();
    const campid = new URLSearchParams(location.search).get('camp_id');
    const navigate = useNavigate();
    const [ideaIds, setIdeaIds] = useState([]);

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
        axios
            .post(`http://localhost:8081/ideas/ideaId?camp_id=${campid}`)
            .then((response) => {
                const { ideaIds } = response.data;
                setIdeaIds(ideaIds);
            })
            .catch((error) => console.error('Error fetching idea IDs:', error));
    }, [campid]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substr(0, maxLength) + '...';
    };

    const handleReadMore = (ideaId) => {
        navigate(`/idea-content/${ideaId}`);
    };


    return (
        <div className='home-page'>
            <Navbar />
            <div className='main-form'>
                <div>
                    <h1 className='idea-heading'>Top 5 Voted Ideas</h1>
                </div>
                <div className='ideas-con'>
                    <table className='ideas-table'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Summary</th>
                                <th>Description</th>
                                <th>Rating</th>
                                <th>Select</th>
                                <th>Read More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ideas.map((idea) => (
                                <tr key={idea.id}>
                                    <td className='title'>{truncateText(idea.idea_title, 40)}</td>
                                    <td className='summ'>{truncateText(idea.idea_summary, 50)}</td>
                                    <td className='descrip'>{truncateText(idea.idea_description, 55)}</td>
                                    <td>{idea.votes}</td>
                                    <td></td>
                                    <td>
                                        <button
                                            className='read-more-btn'
                                            onClick={() => handleReadMore(idea.id)}
                                        >
                                            Click Here
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='submit-container'>
                    <button className='submit-button'>Submit Selected Idea(s)</button>
                </div>
            </div>
        </div>
    )
}

export default Manage;