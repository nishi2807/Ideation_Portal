import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import './votes.css';
import ReactPaginate from 'react-paginate';

function Vote() {
    const [ideas, setIdeas] = useState([]);
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const entriesPerPage = 10;
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [ideaRatings, setIdeaRatings] = useState([]); // Array to store ratings for each idea

    useEffect(() => {
        axios
            .post(`http://localhost:8081/ideas?token=${token}`)
            .then((response) => {
                const allIdeas = response.data;
                setPageCount(Math.ceil(allIdeas.length / entriesPerPage));
                setIdeas(allIdeas.slice(pageNumber * entriesPerPage, (pageNumber + 1) * entriesPerPage));
                setIdeaRatings(allIdeas.map(() => 0)); // Initialize ratings array with 0 for each idea
            })
            .catch((error) => console.error('Error fetching ideas:', error));
    }, [token, pageNumber]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substr(0, maxLength) + '...';
    };

    const handleVote = (rating, index) => {
        // Calculate the correct index for the rating
        const ideaIndex = pageNumber * entriesPerPage + index;
        // Create a copy of the ratings array
        const updatedRatings = [...ideaRatings];
        // Update the rating for the corresponding idea index
        updatedRatings[ideaIndex] = rating;
        // Update the state with the new ratings
        setIdeaRatings(updatedRatings);
    };

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleReadMore = (ideaId) => {
        navigate(`/idea/${ideaId}`);
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
                                <th>Idea Description</th>
                                <th>Vote</th>
                                <th>Idea Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ideas.map((idea, index) => {
                                const ideaIndex = pageNumber * entriesPerPage + index;
                                return (
                                    <tr key={idea.id}>
                                        <td className="title">{truncateText(idea.idea_title, 40)}</td>
                                        <td className="summ">{truncateText(idea.idea_summary, 50)}</td>
                                        <td className="descrip">{truncateText(idea.idea_description, 50)}</td>
                                        <td className="votes-cell">
                                            <Rating
                                                count={5}
                                                size={24}
                                                activeColor="#ffd700"
                                                value={ideaRatings[ideaIndex]}
                                                onChange={(rating) => handleVote(rating, index)}
                                            />
                                        </td>
                                        <td>
                                            <button className="read-more-btn" onClick={() => handleReadMore(idea.id)}>
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
                    <button className="submit-button">Submit Votes</button>
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
