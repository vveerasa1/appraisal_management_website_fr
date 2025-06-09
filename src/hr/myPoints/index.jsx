import React, { useState } from "react";
import "./style.css"
import { Link } from 'react-router-dom'
import Coin from '../../assets/images/coin.png'

const Points = () => {
    // comment modal
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const showCommentModal = () => setIsCommentModalOpen(true);
    const hideCommentModal = () => setIsCommentModalOpen(false);
    // sort modal
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const openSortModal = () => setIsSortModalOpen(true);
    const closeSortModal = () => setIsSortModalOpen(false);
    // filter modal
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const openFilterModal = () => setIsFilterModalOpen(true);
    const closeFilterModal = () => setIsFilterModalOpen(false);

    // range slider
    const [pointsRange, setPointsRange] = useState(55); // Default Points Range
    const [totalPoints, setTotalPoints] = useState(5000); // Default Total Points

    const handlePointsRangeChange = (e) => {
        setPointsRange(e.target.value);
    };

    const handleTotalPointsChange = (e) => {
        setTotalPoints(e.target.value);
    };

    return (
        <>
            <div className='breadcrumb-wrapper'>
                <h3 className='page-name'>Points</h3>
                <ul className='breadcrumb-lists'>
                    <li><Link to="/employee/dashboard" className="page-link">Home</Link></li>
                    <li><p>Point History</p></li>
                </ul>
            </div>
            <div className='page-wrapper'>
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-4 mb-4'>
                        <div className='tpoints-card'>
                            <p>Your points</p>
                            <h2><img className='img-fluid' src={Coin} alt='Coin' /><span>1,500 Points</span></h2>
                            <div className='date-text'>Last update: 5 March, 2025</div>
                        </div>
                    </div>
                    <div className='col-12 col-md-8 col-lg-8 mb-4'>
                        <div className='tpoints-list-top'>
                            <h3>Point History</h3>
                            <div className='filterbtns'>
                                <button type='button' onClick={openSortModal} className='theme-btn btn-blue'><i className='fa fa-sort'></i>Sort</button>
                                <button type='button' onClick={openFilterModal} className='theme-btn btn-blue'><i className='fa fa-filter'></i>Filter</button>
                            </div>
                        </div>
                        <div className='tpoints-lists'>
                            <div className='row'>
                                <div className='col-12 col-md-12 col-lg-12 mb-3'>
                                    <div className='recents-item'>
                                        <div className='ri-left'>
                                            <div className='ri-info'>
                                                <h3 className='tpoint-heading'>Project Completion</h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing eli Morbi dignissim eros in odio eleifend</p>
                                                <button onClick={showCommentModal} className='comment-btn mt-2' type='button'><i className='fa fa-comment'></i>No Comments (Click here to add comment...)</button>
                                            </div>
                                        </div>
                                        <div className='ri-right'>
                                            <div className='ri-points'>
                                                <p className='text font-12px'>Today, 04:32 AM </p>
                                            </div>
                                            <div className='ri-points'>
                                                <img className='img-fluid' src={Coin} alt='Coin' />
                                                <p className='add'>+20</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='pagination-wrapper mt-2'>
                                    <nav>
                                        <ul className="pagination">
                                            <li className="page-item active">
                                                <button className="page-link">
                                                    1
                                                </button>
                                            </li>
                                            <li className="page-item">
                                                <button className="page-link">
                                                    2
                                                </button>
                                            </li>
                                            <li className="page-item">
                                                <button className="page-link">
                                                    3
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isCommentModalOpen && (
                <div className="modal-overlay">
                    <div className="modal comment-modal">
                        <h2 className="modal-heading">Add Comment</h2>
                        <label className='form-label'>Type your comment here</label>
                        <textarea
                            rows="4"
                            cols="40"
                            placeholder="Type your comment here..."
                            className='form-input'
                        ></textarea>
                        <div className="modal-btns">
                            <button onClick={hideCommentModal} className="theme-btn btn-border">Close</button>
                            <button type="button" className="theme-btn btn-blue">Save Comment</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sort Modal */}
            {isSortModalOpen && (
                <div className="modal-overlay">
                    <div className="modal filter-modal">
                        <h2 className="modal-heading">Sort By</h2>
                        <div className="sf-wrapper">
                            <div className="sf-group">
                                <label className='form-label'>Sort</label>
                                <div className="check-group">
                                    <label>
                                        <input type="radio" id="date" name="date" />
                                        Ascending (Oldest to Newest)
                                    </label>
                                    <label>
                                        <input type="radio" id="date" name="date" />
                                        Descending (Newest to Oldest)
                                    </label>
                                </div>
                            </div>
                            <div className="sf-group">
                                <label className='form-label'>Points Change</label>
                                <div className="check-group">
                                    <label>
                                        <input type="radio" id="points" name="points" />
                                        Ascending (Smallest to Largest)
                                    </label>
                                    <label>
                                        <input type="radio" id="points" name="points" />
                                        Descending (Largest to Smallest)
                                    </label>
                                </div>
                            </div>
                            <div className="sf-group">
                                <label className='form-label'>Transaction Type</label>
                                <div className="check-group">
                                    <label>
                                        <input type="radio" id="transaction" name="transaction" />
                                        Bonuses first
                                    </label>
                                    <label>
                                        <input type="radio" id="transaction" name="transaction" />
                                        Deductions first
                                    </label>
                                </div>
                            </div>
                            <div className="sf-group">
                                <label className='form-label'>Running Balance</label>
                                <div className="check-group">
                                    <label>
                                        <input type="radio" id="balance" name="balance" />
                                        Ascending (Lowest to Highest)
                                    </label>
                                    <label>
                                        <input type="radio" id="balance" name="balance" />
                                        Descending (Highest to Lowest)
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-btns">
                            <button onClick={closeSortModal} className="theme-btn btn-border">Close</button>
                            <button type="button" className="theme-btn btn-blue">Sort</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Modal */}
            {isFilterModalOpen && (
                <div className="modal-overlay">
                    <div className="modal filter-modal">
                        <h2 className="modal-heading">Filter By</h2>
                        <div className="sf-wrapper">
                            <div className="sf-group">
                                <label className='form-label'>Date</label>
                                <input type='date' className='form-input' placeholder='' />
                            </div>
                            <div className="sf-group">
                                <label className='form-label'>Transaction Type</label>
                                <div className="check-group">
                                    <label>
                                        <input type="radio" id="fbonus" name="fbonus" />
                                        Bonuses: Show only positive point changes.
                                    </label>
                                    <label>
                                        <input type="radio" id="fbonus" name="fbonus" />
                                        Deductions: Show only negative point changes.
                                    </label>
                                </div>
                            </div>
                            {/* Points Range Slider */}
                            <div className="slider-container">
                                <label className='form-label'>Points Range</label>
                                <div className="range-slider">
                                    <span className="range-label">+5</span>
                                    <input
                                        type="range"
                                        min="5"
                                        max="100"
                                        value={pointsRange}
                                        onChange={handlePointsRangeChange}
                                    />
                                    <span className="range-label">+100</span>
                                </div>
                                <div className="range-value">+{pointsRange}</div>
                            </div>

                            {/* reasons */}
                            <div className="sf-group">
                                <label className='form-label'>Reason</label>
                                <div className="selcetbtns">
                                    <button className="sbtn" type="button">Project Bonus</button>
                                    <button className="sbtn" type="button">Quarterly Appraisal</button>
                                    <button className="sbtn" type="button">Late Arrival</button>
                                    <button className="sbtn" type="button">Spot Award</button>
                                    <button className="sbtn" type="button">Other Custom Reasons</button>
                                </div>
                            </div>

                            {/* Total Points Slider */}
                            <div className="slider-container">
                                <label className='form-label'>Total Points</label>
                                <div className="range-slider">
                                    <span className="range-label">0</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        step="100"
                                        value={totalPoints}
                                        onChange={handleTotalPointsChange}
                                    />
                                    <span className="range-label">10,000</span>
                                </div>
                                <div className="range-value">{totalPoints}</div>
                            </div>
                        </div>
                        <div className="modal-btns">
                            <button onClick={closeFilterModal} className="theme-btn btn-border">Close</button>
                            <button type="button" className="theme-btn btn-blue">Filter</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Points;