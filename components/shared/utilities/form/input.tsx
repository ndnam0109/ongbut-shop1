import { useDebounce } from '@/lib/hooks/useDebounce';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

export interface InputProps {
  type?: 'text' | 'tel' | 'email' | 'number' | 'password' | 'url' | 'color';
  inputClassName?: string;
  debounce?: number | boolean;
  number?: boolean;
  autoFocus?: boolean;
  value?: any;
  onChange?: (val: any) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  error?: string;
  defaultValue?: any;
  noFocus?: boolean;
  className?: string;
}

export function CustomInput({
  type = 'text',
  number = false,
  className = '',
  inputClassName = '',
  ...props
}: InputProps) {
  const [value, setValue] = useState<string | string[]>(getDefaultValue(props));
  const [valueInited, setValueInited] = useState(false);
  const debouncedValue = useDebounce(
    value,
    props.debounce
      ? typeof props.debounce == 'boolean'
        ? 300
        : props.debounce
      : 0
  );
  const ref: MutableRefObject<HTMLInputElement> =
    useRef() as React.MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value?.toString());
    } else {
      setValue(getDefaultValue({ number }));
    }
    setValueInited(true);
  }, [props.value]);

  useEffect(() => {
    if (valueInited && debouncedValue !== undefined && props.onChange) {
      props.onChange(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div
      className={`px-0 relative flex items-center border-group group group-hover:border-primary  ${
        props.readOnly ? 'readOnly' : ''
      } ${props.error ? 'error' : ''} ${className}`}
    >
      <input
        // tabIndex={props.noFocus && -1}
        ref={ref}
        className={` focus:outline-none self-stretch flex-grow px-3 ${
          inputClassName || ''
        }`}
        id={props.id}
        name={props.name}
        value={value}
        type={type}
        readOnly={props.readOnly}
        placeholder={props.placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          setValue(e.target.value);
        }}
        autoFocus={props.autoFocus}
      />
    </div>
  );
}

const numberWithCommasSeparator = (x: string) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const numberWithDotsSeparator = (x: string) => {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const parseNumberToText = (
  num: number | string,
  decimalSeparator: 'dot' | 'comma' = 'dot',
  decimal: boolean = false,
  negative: boolean = true,
  currency: string = ''
) => {
  if (num !== undefined && num !== null) {
    if (typeof num == 'number') {
      if (decimalSeparator == 'dot') {
        let text: string;
        if (decimal) {
          text = num.toString();
        } else {
          text = Math.round(num).toString();
        }

        let negativeText = num < 0 ? '-' : '';
        let dotIndex = text.lastIndexOf('.');
        let integerText = text.slice(
          num < 0 ? 1 : 0,
          dotIndex == -1 ? undefined : dotIndex
        );
        let dotText = dotIndex == -1 ? '' : text.slice(dotIndex);
        return `${negative ? negativeText : ''}${numberWithCommasSeparator(
          integerText
        )}${dotText}${currency}`;
      } else {
        let text: string;
        if (decimal) {
          text = num.toString().replace('.', ',');
        } else {
          text = Math.round(num).toString();
        }

        let negativeText = num < 0 ? '-' : '';
        let commaIndex = text.lastIndexOf(',');
        let integerText = text.slice(
          num < 0 ? 1 : 0,
          commaIndex == -1 ? undefined : commaIndex
        );
        let commaText = commaIndex == -1 ? '' : text.slice(commaIndex);
        return `${negative ? negativeText : ''}${numberWithDotsSeparator(
          integerText
        )}${commaText}${currency}`;
      }
    } else {
      return num.toString();
    }
  }
  return 0;
};

const getDefaultValue = (props: InputProps) => {
  return '';
};

CustomInput.getDefaultValue = getDefaultValue;
