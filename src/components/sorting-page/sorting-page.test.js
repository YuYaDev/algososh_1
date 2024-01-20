import React from "react";
import * as utils  from "../../utils/utils";
import {
    bubbleSortAscending,
    bubbleSortDescending,
    selectionSortAscending,
    selectionSortDescending
} from "./sorting-page";
import {ElementStates} from "../../types/element-states";

const mockSetStr = jest.fn();
const mockSetLoader = jest.fn();
const delay = jest.spyOn(utils, 'setDelay').mockImplementation(() => Promise.resolve());

describe('Bubble sorting', () => {
    describe('descending order', () => {
        test('empty', async () => {
            const arr =[]
            await bubbleSortDescending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).not.toBeCalled()
        });
        test('one element', async () => {
            const arr =[
                {value: 1, color: ElementStates.Default},
            ]
            await bubbleSortDescending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).not.toBeCalled()
        });
        test('several elements', async () => {
            const arr =[
                {value: 2, color: ElementStates.Default},
                {value: 1, color: ElementStates.Default},
                {value: 3, color: ElementStates.Default},
            ]
            const step =[
                {value: 3, color: ElementStates.Modified},
                {value: 2, color: ElementStates.Modified},
                {value: 1, color: ElementStates.Modified},
            ]
            await bubbleSortDescending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).toHaveBeenCalledTimes(6)
            expect(mockSetStr).toHaveBeenCalledWith(step)
        });
    });
    describe('ascending order', () => {
        test('empty', async () => {
            const arr =[]
            await bubbleSortAscending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).not.toBeCalled()
        });
        test('one element', async () => {
            const arr =[
                {value: 1, color: ElementStates.Default},
            ]
            await bubbleSortAscending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).not.toBeCalled()
        });
        test('several elements', async () => {
            const arr =[
                {value: 2, color: ElementStates.Default},
                {value: 1, color: ElementStates.Default},
                {value: 3, color: ElementStates.Default},
            ]
            const step =[
                {value: 1, color: ElementStates.Modified},
                {value: 2, color: ElementStates.Modified},
                {value: 3, color: ElementStates.Modified},
            ]
            await bubbleSortAscending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).toHaveBeenCalledTimes(6)
            expect(mockSetStr).toHaveBeenCalledWith(step)
        });
    });
});

describe('Select sorting', () => {
    describe('descending order', () => {
        test('empty', async () => {
            const arr =[]
            await selectionSortDescending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).not.toBeCalled()
        });
        test('one element', async () => {
            const arr =[
                {value: 1, color: ElementStates.Default},
            ]
            await selectionSortDescending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).not.toBeCalled()
        });
        test('several elements', async () => {
            const arr =[
                {value: 2, color: ElementStates.Default},
                {value: 1, color: ElementStates.Default},
                {value: 3, color: ElementStates.Default},
            ]
            const step =[
                {value: 3, color: ElementStates.Modified},
                {value: 2, color: ElementStates.Modified},
                {value: 1, color: ElementStates.Modified},
            ]
            await selectionSortDescending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).toHaveBeenCalledTimes(7)
            expect(mockSetStr).toHaveBeenCalledWith(step)
            expect(mockSetStr).toHaveBeenNthCalledWith(3,step)
        });
    });
    describe('ascending order', () => {
        test('empty', async () => {
            const arr =[]
            await selectionSortAscending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).not.toBeCalled()
        });
        test('one element', async () => {
            const arr =[
                {value: 1, color: ElementStates.Default},
            ]
            await selectionSortAscending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).not.toBeCalled()
        });
        test('several elements', async () => {
            const arr =[
                {value: 2, color: ElementStates.Default},
                {value: 1, color: ElementStates.Default},
                {value: 3, color: ElementStates.Default},
            ]
            const step =[
                {value: 1, color: ElementStates.Modified},
                {value: 2, color: ElementStates.Modified},
                {value: 3, color: ElementStates.Modified},
            ]
            await selectionSortAscending(arr, mockSetStr, mockSetLoader)
            expect(mockSetStr).toHaveBeenCalledTimes(7)
            expect(mockSetStr).toHaveBeenCalledWith(step)
        });
    });
});
