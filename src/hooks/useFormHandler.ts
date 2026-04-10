import { useForm, type UseFormReturn, type UseFormProps } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface UseFormHandlerProps<T extends yup.AnyObjectSchema> extends Omit<UseFormProps<yup.InferType<T>>, 'resolver'> {
  schema: T;
}

export const useFormHandler = <T extends yup.AnyObjectSchema>({
  schema,
  ...formProps
}: UseFormHandlerProps<T>): UseFormReturn<yup.InferType<T>> => {
  return useForm<yup.InferType<T>>({
    ...formProps,
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
};
