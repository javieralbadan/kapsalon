'use client';
import { Button, Form, FormInstance } from 'antd';
import React, { PropsWithChildren, useEffect, useState } from 'react';

interface Props {
	form: FormInstance;
	isDisabled?: boolean;
}

export const SubmitButton: React.FC<PropsWithChildren<Props>> = ({
	form,
	isDisabled,
	children,
}) => {
	const [submittable, setSubmittable] = useState<boolean>(false);

	// Watch all values
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const values = Form.useWatch([], form);

	useEffect(() => {
		form
			.validateFields({ validateOnly: true })
			.then(() => setSubmittable(true))
			.catch(() => setSubmittable(false));
	}, [form, values]);

	return (
		<Button type="primary" htmlType="submit" disabled={isDisabled || !submittable}>
			{children}
		</Button>
	);
};
