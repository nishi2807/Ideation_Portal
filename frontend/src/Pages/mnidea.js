import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
// import './mnidea.css';

function Mnidea() {
    const [ideas, setIdeas] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const entriesPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .post(`http://localhost:8081/ideas?token=${token}`)
            .then((response) => {
                const allIdeas = response.data;
                setPageCount(Math.ceil(allIdeas.length / entriesPerPage));
                setIdeas(allIdeas.slice(pageNumber * entriesPerPage, (pageNumber + 1) * entriesPerPage));
            })
            .catch((error) => console.error('Error fetching ideas:', error));
    }, [token, pageNumber]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substr(0, maxLength) + '...';
    };

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleReadMore = (ideaId) => {
        // Handle the "Read More" button click
        // Redirect to the idea detail page or perform any other desired action
        navigate(`/idea/${ideaId}`);
    };

    return (
        <div className='home-page'>
            <Navbar />
            <div className='main-form'>
                <div>
                    <h1 className='idea-heading'>Posted Ideas</h1>
                </div>
                <div className='ideas-con'>
                    <table className='ideas-table'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Summary</th>
                                <th>Description</th>
                                <th>Read More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ideas.map((idea) => (
                                <tr key={idea.id}>
                                    <td className='title'>{truncateText(idea.idea_title, 40)}</td>
                                    <td className='summ'>{truncateText(idea.idea_summary, 60)}</td>
                                    <td className='descrip'>{truncateText(idea.idea_description, 60)}</td>
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
                    <button className='submit-button'>Submit an Idea</button>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        </div>
    );
}

export default Mnidea;
