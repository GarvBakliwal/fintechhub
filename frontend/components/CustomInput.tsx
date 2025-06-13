import React from 'react';
import { Controller, Control, FieldPath } from 'react-hook-form';
import { Input } from './ui/input';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema('sign-up');

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInputProps) => {
  return (
    <div className="form-item">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            placeholder={placeholder}
            className="input-class"
            type={name === 'password' ? 'password' : 'text'}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default CustomInput;