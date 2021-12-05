import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BreadcrumbProvider } from '..';
import { UpLink } from './UpLink';

function getNavLinks() {
    const lists = screen.getAllByRole('list');

    expect(lists.length).toBeGreaterThanOrEqual(1);

    return within(lists[0]).getAllByRole('link');
}

beforeEach(() =>
    render(
        <BrowserRouter>
            <BreadcrumbProvider>
                <UpLink />
            </BreadcrumbProvider>
        </BrowserRouter>
    )
);

test('up several times', () => {
    fireEvent.click(screen.getByText('Section 1'));
    fireEvent.click(screen.getByText('Item 2'));

    let navLinks = getNavLinks();
    expect(navLinks.length).toBe(1);
    let [upLink] = navLinks;

    expect(upLink).toHaveTextContent('Go Up');
    expect(upLink).toHaveAttribute('href', '/section1');

    const item2Welcome = screen.getByText('This is the Item 2 page.');
    expect(item2Welcome).not.toBeNull();

    fireEvent.click(upLink);
    
    navLinks = getNavLinks();
    expect(navLinks.length).toBe(1);
    [upLink] = navLinks;

    expect(upLink).toHaveTextContent('Go Up');
    expect(upLink).toHaveAttribute('href', '/');

    const section1Welcome = screen.getByText('This is Section 1');
    expect(section1Welcome).not.toBeNull();

    fireEvent.click(upLink);

    navLinks = getNavLinks();
    expect(navLinks.length).toBe(1);
    const [home] = navLinks;

    expect(home).toHaveTextContent('You are at the top level');
    expect(home).toHaveAttribute('href', '/');

    const homeWelcome = screen.getByText('This is the home page.');
    expect(homeWelcome).not.toBeNull();
});
