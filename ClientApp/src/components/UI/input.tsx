import { DetailedHTMLProps } from "react";
import classes from './input.module.css';
import React from 'react';

interface InputUI {
    label: string;
    input: DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}

export const Input = React.forwardRef((props: InputUI, ref: any) => {
    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input}/>
    </div>
});