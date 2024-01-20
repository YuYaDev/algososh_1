import React from "react";
import {reverse} from "./string";
import {ElementStates} from "../../types/element-states";
import * as utils  from "../../utils/utils";

const mockSetStr = jest.fn();
const mockSetLoader = jest.fn();

describe('String reverse', () => {
    const delay = jest.spyOn(utils, 'setDelay').mockImplementation(() => Promise.resolve());
    test('even number of letters', async () => {
        const arr =[
            {value: '1', color: ElementStates.Default},
            {value: '2', color: ElementStates.Default},
            {value: '3', color: ElementStates.Default},
            {value: '4', color: ElementStates.Default},
        ]
        const step1 =[
            {value: '1', color: ElementStates.Modified},
            {value: '2', color: ElementStates.Modified},
            {value: '3', color: ElementStates.Modified},
            {value: '4', color: ElementStates.Modified},
        ]
        const step2 =[
            {value: '4', color: ElementStates.Modified},
            {value: '2', color: ElementStates.Modified},
            {value: '3', color: ElementStates.Modified},
            {value: '1', color: ElementStates.Modified},
        ]
        const step3 =[
            {value: '4', color: ElementStates.Modified},
            {value: '2', color: ElementStates.Modified},
            {value: '3', color: ElementStates.Modified},
            {value: '1', color: ElementStates.Modified},
        ]
        const step4 =[
            {value: '4', color: ElementStates.Modified},
            {value: '3', color: ElementStates.Modified},
            {value: '2', color: ElementStates.Modified},
            {value: '1', color: ElementStates.Modified},
        ]
        await reverse(arr, mockSetStr, mockSetLoader)
        expect(delay).toBeCalled()
        expect(mockSetStr).toHaveBeenNthCalledWith(1, step1)
        expect(mockSetStr).toHaveBeenNthCalledWith(2, step2)
        expect(mockSetStr).toHaveBeenNthCalledWith(3, step3)
        expect(mockSetStr).toHaveBeenNthCalledWith(4, step4)
    });
    test('odd number of letters', async () => {
        const arr =[
            {value: '1', color: ElementStates.Default},
            {value: '2', color: ElementStates.Default},
            {value: '3', color: ElementStates.Default},
        ]
        const step1 =[
            {value: '1', color: ElementStates.Modified},
            {value: '2', color: ElementStates.Modified},
            {value: '3', color: ElementStates.Modified},
        ]
        const step2 =[
            {value: '3', color: ElementStates.Modified},
            {value: '2', color: ElementStates.Modified},
            {value: '1', color: ElementStates.Modified},
        ]
        const step3 =[
            {value: '3', color: ElementStates.Modified},
            {value: '2', color: ElementStates.Modified},
            {value: '1', color: ElementStates.Modified},
        ]
        await reverse(arr, mockSetStr, mockSetLoader)
        expect(delay).toBeCalled()
        expect(mockSetStr).toHaveBeenNthCalledWith(1, step1)
        expect(mockSetStr).toHaveBeenNthCalledWith(2, step2)
        expect(mockSetStr).toHaveBeenNthCalledWith(3, step3)
    });
    test('one symbol', async () => {
        expect(delay).not.toBeCalled()
    });
    test('empty', async () => {
        expect(delay).not.toBeCalled()
    });
});
