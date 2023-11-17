import React, {ChangeEvent, useState} from "react";
import {ElementStates} from "../../types/element-states";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import stackPageStyles from './stack-page.module.css';
import {SHORT_DELAY_IN_MS} from '../../constants/delays';
import {Stack} from "./stack-page.utils";
import {setDelay} from "../../utils/utils";
import {ButtonState} from "../../types/buttonState";

type TStackItem = {
    value: string;
    color: ElementStates;
};

export const StackPage: React.FC = () => {
    const [stackArr, setStackArr] = useState<TStackItem[]>([]);
    const [inputValue, setInputValue] = useState('');

    const [loader, setLoader] = useState<ButtonState>({
        buttonAdd: false,
        buttonDelete: false,
        buttonReset: false
    });

    const [stack] = useState(new Stack<TStackItem>());

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddButton = async () => {
        if (inputValue) {
            setLoader({ ...loader, buttonAdd: true });
            stack.push({value: inputValue, color: ElementStates.Changing});
            setInputValue('');
            setStackArr([...stack.getElements()]);
            await setDelay(SHORT_DELAY_IN_MS);
            stack.peek.color = ElementStates.Default;
            setStackArr([...stack.getElements()]);
            setLoader({ ...loader, buttonAdd: false });
        }
    };

    const handleDeleteButton = async () => {
        setLoader({ ...loader, buttonDelete: true });
        stack.peek.color = ElementStates.Changing;
        setStackArr([...stack.getElements()]);
        await setDelay(SHORT_DELAY_IN_MS);
        stack.pop();
        setStackArr([...stack.getElements()]);
        setLoader({ ...loader, buttonDelete: false });
    };

    const handleRemoveAllButton = () => {
        setLoader({ ...loader, buttonReset: true })
        stack.clear()
        setStackArr([...stack.getElements()]);
        setLoader({ ...loader, buttonReset: false })
    };

    const givePosition = (index: number, arr: TStackItem[]): string => {
        if (index === arr.length - 1) {
            return 'top';
        } else {
            return '';
        }
    };

    return (
        <SolutionLayout title="Стек">
            <div className={stackPageStyles.mainContainer}>
                <div className={stackPageStyles.inputContainer}>
                    <section className={stackPageStyles.inputSection}>
                        <div className={stackPageStyles.input}>
                            <Input maxLength={4} isLimitText={true} type="text" value={inputValue} onChange={onChange}/>
                        </div>
                        <div className={stackPageStyles.addButton}>
                            <Button text="Добавить" data-testid='addBtn' onClick={handleAddButton}  isLoader={loader.buttonAdd}
                                    disabled={inputValue === ''}/>
                        </div>
                        <div className={stackPageStyles.deleteButton}>
                            <Button text="Удалить" data-testid='deleteBtn' onClick={handleDeleteButton} isLoader={loader.buttonDelete}
                                    disabled={!stackArr.length}/>
                        </div>
                    </section>
                    <div className={stackPageStyles.button}>
                        <Button text="Очистить" data-testid='removeBtn' onClick={handleRemoveAllButton} isLoader={loader.buttonReset}
                                disabled={!stackArr.length}/>
                    </div>
                </div>
                <ul className={stackPageStyles.circlesBox}>
                    {stackArr && stackArr.map((item, index) =>
                        <li key={index}>
                            <Circle letter={item.value} state={item.color} index={index}
                                    head={givePosition(index, stackArr)}/>
                        </li>)}
                </ul>
            </div>
        </SolutionLayout>
    );
};
