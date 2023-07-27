import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import './votes.css';
import ReactPaginate from 'react-paginate';

function Vote() {
    const [ideas, setIdeas] = useState([]);
    const [allIdeas, setAllIdeas] = useState([]); // New state for storing all ideas
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const campid = new URLSearchParams(location.search).get('camp_id');
    const entriesPerPage = 10;
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [ideaIds, setIdeaIds] = useState([]);
    const [prevRatings, setPrevRatings] = useState([]);

    useEffect(() => {
        setPrevRatings((prevRatings) => {
            const updatedPrevRatings = [...prevRatings];
            for (let i = prevRatings.length; i < pageCount; i++) {
                updatedPrevRatings[i] = [];
            }
            return updatedPrevRatings;
        });
    }, [pageCount]);


    useEffect(() => {
        axios
            .post(`http://localhost:8081/ideas?token=${token}`)
            .then((response) => {
                const allIdeas = response.data;
                setAllIdeas(allIdeas); // Store all ideas in the state
                setPageCount(Math.ceil(allIdeas.length / entriesPerPage));
                const ideasToDisplay = allIdeas.slice(
                    pageNumber * entriesPerPage,
                    (pageNumber + 1) * entriesPerPage
                );
                setIdeas(ideasToDisplay);
            })
            .catch((error) => console.error('Error fetching ideas:', error));
    }, [token, pageNumber]);

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

    const handleVote = (rating, index) => {
        setPrevRatings((prevRatings) => {
            const updatedRatings = [...prevRatings];
            updatedRatings[pageNumber] = [...updatedRatings[pageNumber]]; // Create a new array to ensure immutability
            updatedRatings[pageNumber][index] = rating;
            return updatedRatings;
        });
    };

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleSubmitVotes = () => {
        const allRatings = prevRatings.flat(); // Flatten the ratings array
        console.log(allRatings);

        axios
            .post(`http://localhost:8081/ideas/voting?token=${token}&camp_id=${campid}`, { votes: allRatings })
            .then((response) => {
                alert('Your votes are successfully submitted!');
                console.log('Votes submitted successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error submitting votes:', error);
            });
    };

    const fetchIdeaContent = (ideaId) => {
        axios
            .post(`http://localhost:8081/ideas/ideaContent?idea_id=${ideaId}`)
            .then((response) => {
                const { ideaContent } = response.data;
                navigate(`/idea-content/${ideaId}`, { state: { ideaContent } });
            })
            .catch((error) => console.error('Error fetching idea content:', error));
    };

    const goBack = () => {
        navigate(-1); // Go back to the previous page
    };
    
    return (
        <div className="home-page">
            <Navbar />
            <div className="main-form">
                <div>
                    <h1 className="idea-heading">Vote these Ideas</h1>
                </div>
                <div className="ideas-con">
                    <table className="ideas-table">
                        <thead>
                            <tr>
                                <th>Idea Title</th>
                                <th>Idea Summary</th>
                                <th>Idea Implimentation</th>
                                <th>Vote</th>
                                <th>Idea Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ideas.map((idea, index) => {
                                const ideaIndex = pageNumber * entriesPerPage + index;
                                const ideaId = ideaIds[ideaIndex];
                                return (
                                    <tr key={ideaId}>
                                        <td className="title">{truncateText(idea.idea_title, 40)}</td>
                                        <td className="summ">{truncateText(idea.idea_summary, 50)}</td>
                                        <td className="descrip">{truncateText(idea.idea_description, 50)}</td>
                                        <td className="votes-cell">
                                            <Rating
                                                count={5}
                                                size={20}
                                                activeColor="#ffd700"
                                                value={prevRatings[pageNumber]?.[index] || 0} // Use previous rating if available
                                                onChange={(rating) => handleVote(rating, index)}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="read-more-btn"
                                                onClick={() => fetchIdeaContent(ideaId)}
                                            >
                                                Click Here
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="submit-container">
                    <button className='goback-btn' onClick={goBack}>Go Back</button>
                    <button className="submit-button" onClick={handleSubmitVotes}>
                        Submit Votes
                    </button>
                    <ReactPaginate
                        previousLabel={'◀'}
                        nextLabel={'▶'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={4}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakLinkClassName={'page-link'}
                    />
                </div>
            </div>
        </div>
    );
}

export default Vote;
