import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
// import './mnidea.css';

function Mnideacamp() {
    const [ideas, setIdeas] = useState([]);
    const [allIdeas, setAllIdeas] = useState([]);
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    const campid = new URLSearchParams(location.search).get('camp_id');
    const camptitle = new URLSearchParams(location.search).get('camp_title');
    const entriesPerPage = 10;
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [ideaIds, setIdeaIds] = useState([]);

    useEffect(() => {
        axios
            .post(`http://localhost:8081/ideas?camp_id=${campid}`)
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

    const SubmitIdea = () => {
        navigate(`/post-idea?token=${token}&camp_title=${camptitle}&camp_id=${campid}`)
    }

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substr(0, maxLength) + '...';
    };

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
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
        navigate('/campaign');
    };

    const CurrentUser_role = useSelector((state) => state.CurrentUser_role);

    return (
        <div className='home-page'>
            <Navbar />
            <div className='main-form'>
                <div>
                    <h1 className='idea-heading'>Posted Ideas</h1>
                </div>
                <div className='ideas-con'>
                    <table className='ideas-table'>
                        <thead className='theading'>
                            <tr>
                                <th>Title</th>
                                <th>Summary</th>
                                <th>Description</th>
                                <th>Read More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ideas.map((idea, index) => {
                                const ideaIndex = pageNumber * entriesPerPage + index;
                                const ideaId = ideaIds[ideaIndex];
                                return (
                                    <tr key={ideaId}>
                                        <td className="ititle">{truncateText(idea.idea_title, 40)}</td>
                                        <td className="isumm">{truncateText(idea.idea_summary, 50)}</td>
                                        <td className="idescrip">{truncateText(idea.idea_description, 50)}</td>
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
                <div className='submit-container'>
                    <button className='submit-button' onClick={goBack}>Go Back</button>
                    {/* {CurrentUser_role === "user" && (
                        <div>
                            <button className='submit-button' onClick={SubmitIdea}>Submit an Idea</button>
                        </div>
                    )} */}
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

export default Mnideacamp;
