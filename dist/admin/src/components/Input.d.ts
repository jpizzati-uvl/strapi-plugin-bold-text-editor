/// <reference types="react" />
import { MessageDescriptor } from 'react-intl';
type InputProps = {
    value: string;
    name: string;
    onChange: (e: {
        target: {
            name: string;
            value: string;
        };
    }) => void;
    error?: string;
    description?: MessageDescriptor;
    required?: boolean;
    labelAction?: React.ReactNode;
    intlLabel: MessageDescriptor;
    attribute: {
        options?: {
            output?: string;
        };
    };
    hint?: string;
};
declare const Input: React.FC<InputProps>;
export default Input;
