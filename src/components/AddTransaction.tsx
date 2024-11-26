import React from 'react';
import { Transaction } from '../data/types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface AddTransactionProps {
    transaction: Transaction;
    onChange: (transaction: Transaction) => void;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ transaction, onChange }) => {

    const today = new Date().toISOString().slice(0, 10);

    const validationSchema = Yup.object().shape({
        date: Yup.date().required('Дата обязательна'),
        description: Yup.string().required('Описание обязательно'),
        amount: Yup.number().required('Сумма обязательна').positive('Сумма должна быть положительной'),
        category: Yup.string().required('Категория обязательна'),
        type: Yup.string().oneOf(['доход', 'расход'], 'Выберите тип транзакции'),
    });

    return (
        <Formik
            initialValues={{
                date: today,
                description: transaction.description,
                amount: transaction.amount,
                category: transaction.category,
                type: transaction.type,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                const formattedTransaction: Transaction = {
                    date: new Date(values.date),
                    description: values.description,
                    amount: values.amount,
                    category: values.category,
                    type: values.type === 'доход' ? 'доход' : 'расход',
                };
                onChange(formattedTransaction);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label htmlFor="date">
                        Дата:
                        <Field type="date" name="date" id="date" />
                        <ErrorMessage name="date" component="div" className="error" />
                    </label>
                    <br />
                    <label htmlFor="description">
                        Описание:
                        <Field type="text" name="description" id="description" />
                        <ErrorMessage name="description" component="div" className="error" />
                    </label>
                    <br />
                    <label htmlFor="amount">
                        Сумма:
                        <Field type="number" name="amount" id="amount" />
                        <ErrorMessage name="amount" component="div" className="error" />
                    </label>
                    <br />
                    <label htmlFor="category">
                        Категория:
                        <Field type="text" name="category" id="category" />
                        <ErrorMessage name="category" component="div" className="error" />
                    </label>
                    <br />
                    <label htmlFor="type">
                        Тип:
                        <Field as="select" name="type" id="type">
                            <option value="доход">Доход</option>
                            <option value="расход">Расход</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="error" />
                    </label>
                    <br />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Отправка...' : 'Добавить транзакцию'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default AddTransaction;