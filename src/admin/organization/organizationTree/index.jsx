import { useState, useEffect, useRef } from 'react';
import "./style.css"
import { Link } from 'react-router-dom'
import ProfileImg from '../../../assets/images/user.png'
import Select from "react-select";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const OrganizationTree = () => {
    const [activeTab, setActiveTab] = useState("employee");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className='pageTanDiv'>
                <ul className='pageTabPane'>
                    <li>
                        <Link to="/admin/employees">Employee</Link>
                    </li>
                    <li>
                        <Link to="/admin/organization/department">Department</Link>
                    </li>
                    <li>
                        <Link to="/admin/organization/designation">Designation</Link>
                    </li>
                    <li className='active'>
                        <Link to="/admin/organization/tree">Organization Tree</Link>
                    </li>
                </ul>
            </div>
            <div className='tree-lists-container pt-1 tree ovdash-memebrs-count'>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "employee" ? "active" : ""}`}
                            onClick={() => handleTabChange("employee")}
                        >
                            Employees Tree
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "dmembers" ? "active" : ""}`}
                            onClick={() => handleTabChange("dmembers")}
                        >
                            Department Tree
                        </button>
                    </li>
                </ul>
                {/* Tab Content */}
                <div className="tab-content mt-3">
                    {activeTab === "employee" && (
                        <div className="tab-pane fade show active">
                            <div className='tree-wrapper'>
                                <div className='tree-item'>
                                    <div className='tree-first-parent'>
                                        <div className='tree-info-wrapper'>
                                            <span className='ti-icon'>SM</span>
                                            <div className='ti-detail'>
                                                <h3>Maxy Jacky</h3>
                                                <p>Team Leader</p>
                                            </div>
                                        </div>
                                        <span className='tcount'>3</span>
                                    </div>
                                    <div className='tree-employee-list'>
                                        <div className='tree-empItem has-employee'>
                                            <div className='tree-empItem-has-parent'>
                                                {/* second parent - employee item */}
                                                <div className='te-has-item'>
                                                    <div className='tree-info-wrapper'>
                                                        <span className='ti-icon'>SM</span>
                                                        <div className='ti-detail'>
                                                            <h3>Jackson Walt</h3>
                                                            <p>Team Leader</p>
                                                        </div>
                                                    </div>
                                                    <span className='tcount'>2</span>
                                                </div>
                                            </div>
                                            <div className='tree-empItem-has-list'>
                                                <div className='tree-empItem'>
                                                    <div className='tree-info-wrapper'>
                                                        <span className='ti-icon'>SM</span>
                                                        <div className='ti-detail'>
                                                            <h3>William Smith</h3>
                                                            <p>Team Leader</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='tree-empItem'>
                                                    <div className='tree-info-wrapper'>
                                                        <span className='ti-icon'>SM</span>
                                                        <div className='ti-detail'>
                                                            <h3>Mary Joe</h3>
                                                            <p>Team Leader</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='tree-empItem'>
                                                    <div className='tree-info-wrapper'>
                                                        <span className='ti-icon'>SM</span>
                                                        <div className='ti-detail'>
                                                            <h3>Mary Joe</h3>
                                                            <p>Team Leader</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='tree-empItem has-employee'>
                                            <div className='tree-empItem-has-parent'>
                                                {/* second parent - employee item */}
                                                <div className='te-has-item'>
                                                    <div className='tree-info-wrapper'>
                                                        <span className='ti-icon'>SM</span>
                                                        <div className='ti-detail'>
                                                            <h3>Martin Luther</h3>
                                                            <p>Team Leader</p>
                                                        </div>
                                                    </div>
                                                    <span className='tcount'>2</span>
                                                </div>
                                            </div>
                                            <div className='tree-empItem-has-list'>
                                                <div className='tree-empItem has-employee'>
                                                    <div className='tree-empItem-has-parent'>
                                                        {/* second parent - employee item */}
                                                        <div className='te-has-item'>
                                                            <div className='tree-info-wrapper'>
                                                                <span className='ti-icon'>SM</span>
                                                                <div className='ti-detail'>
                                                                    <h3>Jackson Walt</h3>
                                                                    <p>Team Leader</p>
                                                                </div>
                                                            </div>
                                                            <span className='tcount'>2</span>
                                                        </div>
                                                    </div>
                                                    <div className='tree-empItem-has-list'>
                                                        <div className='tree-empItem'>
                                                            <div className='tree-info-wrapper'>
                                                                <span className='ti-icon'>SM</span>
                                                                <div className='ti-detail'>
                                                                    <h3>William Smith</h3>
                                                                    <p>Team Leader</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='tree-empItem'>
                                                            <div className='tree-info-wrapper'>
                                                                <span className='ti-icon'>SM</span>
                                                                <div className='ti-detail'>
                                                                    <h3>Mary Joe</h3>
                                                                    <p>Team Leader</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='tree-empItem'>
                                                    <div className='tree-info-wrapper'>
                                                        <span className='ti-icon'>SM</span>
                                                        <div className='ti-detail'>
                                                            <h3>Mary Joe</h3>
                                                            <p>Team Leader</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='tree-empItem'>
                                            <div className='tree-info-wrapper'>
                                                <span className='ti-icon'>SM</span>
                                                <div className='ti-detail'>
                                                    <h3>Ather Saba</h3>
                                                    <p>Team Leader</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "dmembers" && (
                        <div className="tab-pane fade show active">
                            <div className='tree-wrapper'>
                                <div className='tree-item'>
                                    <div className='tree-first-parent'>
                                        <div className='tree-info-wrapper'>
                                            <span className='ti-icon'>SD</span>
                                            <div className='ti-detail'>
                                                <h3>Software Development</h3>
                                                <p>-</p>
                                            </div>
                                        </div>
                                        <span className='tcount'>3</span>
                                    </div>
                                    <div className='tree-employee-list'>
                                        <div className='tree-empItem'>
                                            <div className='tree-info-wrapper'>
                                                <span className='ti-icon'>SM</span>
                                                <div className='ti-detail'>
                                                    <h3>Surina Matte</h3>
                                                    <p>Team Leader</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='tree-empItem'>
                                            <div className='tree-info-wrapper'>
                                                <span className='ti-icon'>SM</span>
                                                <div className='ti-detail'>
                                                    <h3>Surina Matte</h3>
                                                    <p>Team Leader</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='tree-empItem'>
                                            <div className='tree-info-wrapper'>
                                                <span className='ti-icon'>SM</span>
                                                <div className='ti-detail'>
                                                    <h3>Surina Matte</h3>
                                                    <p>Team Leader</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='tree-item'>
                                    <div className='tree-first-parent'>
                                        <div className='tree-info-wrapper'>
                                            <span className='ti-icon'>A</span>
                                            <div className='ti-detail'>
                                                <h3>Administration</h3>
                                                <p>-</p>
                                            </div>
                                        </div>
                                        <span className='tcount'>3</span>
                                    </div>
                                    <div className='tree-employee-list'>
                                        <div className='tree-empItem'>
                                            <div className='tree-info-wrapper'>
                                                <span className='ti-icon'>SM</span>
                                                <div className='ti-detail'>
                                                    <h3>Surina Matte</h3>
                                                    <p>Team Leader</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='tree-empItem'>
                                            <div className='tree-info-wrapper'>
                                                <span className='ti-icon'>SM</span>
                                                <div className='ti-detail'>
                                                    <h3>Surina Matte</h3>
                                                    <p>Team Leader</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='tree-empItem'>
                                            <div className='tree-info-wrapper'>
                                                <span className='ti-icon'>SM</span>
                                                <div className='ti-detail'>
                                                    <h3>Surina Matte</h3>
                                                    <p>Team Leader</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrganizationTree;