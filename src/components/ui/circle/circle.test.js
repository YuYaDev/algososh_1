import React from 'react';
import renderer from 'react-test-renderer';
import { Circle } from './circle';
import {ArrowIcon} from "../icons/arrow-icon";
import {ElementStates} from "../../../types/element-states";

describe('Circle style', () => {
    test('without text', () => {
        const button = renderer
            .create(<Circle />)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('with text', () => {
        const button = renderer
            .create(<Circle letter="Test letter"/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('with head', () => {
        const button = renderer
            .create(<Circle head="Test head"/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('with react head', () => {
        const button = renderer
            .create(<Circle head={<ArrowIcon />}/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('with tail', () => {
        const button = renderer
            .create(<Circle head="Test tail"/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('with react tail', () => {
        const button = renderer
            .create(<Circle tail={<ArrowIcon />}/>)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('with index', () => {
        const button = renderer
            .create(<Circle index={15} />)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('small', () => {
        const button = renderer
            .create(<Circle isSmall={true} />)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('state default', () => {
        const button = renderer
            .create(<Circle isSmall={false} state={ElementStates.Default} />)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('state changing', () => {
        const button = renderer
            .create(<Circle isSmall={false} state={ElementStates.Changing} />)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
    test('state modified', () => {
        const button = renderer
            .create(<Circle isSmall={false} state={ElementStates.Modified} />)
            .toJSON();
        expect(button).toMatchSnapshot();
    });
});
