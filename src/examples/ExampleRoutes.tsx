import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useBreadcrumb } from '..';

const ExampleAbout = () => {
    useBreadcrumb('About');

    return <p>This is the about page.</p>;
};

const ExampleItem: React.FC<{ name: string }> = (props) => {
    useBreadcrumb(props.name);

    return <p>This is the {props.name} page.</p>;
};

const ExampleSection1 = () => {
    useBreadcrumb('Section 1');

    return (
        <Routes>
            <Route
                index
                element={
                    <div>
                        <p>This is Section 1</p>
                        <ul>
                            <li>
                                <Link to="item1">Item 1</Link>
                            </li>
                            <li>
                                <Link to="item2">Item 2</Link>
                            </li>
                        </ul>
                    </div>
                }
            />
            <Route path="item1" element={<ExampleItem name="Item 1" />} />
            <Route path="item2" element={<ExampleItem name="Item 2" />} />
        </Routes>
    );
};

const ExampleSection2 = () => {
    useBreadcrumb('Section 2');

    return (
        <Routes>
            <Route
                index
                element={
                    <div>
                        <p>This is Section 2</p>
                        <ul>
                            <li>
                                <Link to="item3">Item 3</Link>
                            </li>
                            <li>
                                <Link to="item4">Item 4</Link>
                            </li>
                        </ul>
                    </div>
                }
            />
            <Route path="item3" element={<ExampleItem name="Item 3" />} />
            <Route path="item4" element={<ExampleItem name="Item 4" />} />
        </Routes>
    );
};

const ExampleHome = () => {
    return (
        <div>
            <p>This is the home page.</p>

            <ul>
                <li>
                    <Link to="section1">Section 1</Link>
                </li>
                <li>
                    <Link to="section2">Section 2</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
            </ul>
        </div>
    );
};

export const ExampleRoutes = () => {
    useBreadcrumb('Home');

    return (
        <Routes>
            <Route index element={<ExampleHome />} />
            <Route path="section1/*" element={<ExampleSection1 />} />
            <Route path="section2/*" element={<ExampleSection2 />} />
            <Route path="about" element={<ExampleAbout />} />
        </Routes>
    );
};
