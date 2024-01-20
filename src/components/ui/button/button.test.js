import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button style', () => {
    test('with text', () => {
        const button = renderer
            .create(<Button text="Test text"/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('without text', () => {
        const button = renderer
            .create(<Button />)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('disabled', () => {
        const button = renderer
            .create(<Button disabled={true}/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('loading', () => {
        const button = renderer
            .create(<Button isLoader={true}/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('callback', () => {
        window.alert = jest.fn();
        render(<Button onClick={() => alert('Clicked')} text="Test text"/>);
        const button = screen.getByText("Test text");
        fireEvent.click(button);
        expect(window.alert).toHaveBeenCalledWith('Clicked');
    });
});
