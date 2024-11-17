'use client';
import { Button, Form, FormInstance } from 'antd';
import React, { PropsWithChildren } from 'react';

interface Props {
	form: FormInstance;
	isDisabled?: boolean;
	isLoading?: boolean;
}

export const SubmitButton: React.FC<PropsWithChildren<Props>> = ({
	form,
	isDisabled,
	isLoading,
	children,
}) => {
	return (
		<Form.Item shouldUpdate className="mb-0">
			{() => (
				<Button
					type="primary"
					htmlType="submit"
					disabled={
						isDisabled ||
						!form.isFieldsTouched(true) ||
						!!form.getFieldsError().filter(({ errors }) => errors.length).length
					}
					loading={isLoading}
				>
					{!isLoading && children}
				</Button>
			)}
		</Form.Item>
	);
};
