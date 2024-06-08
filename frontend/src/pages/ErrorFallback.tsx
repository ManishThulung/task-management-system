import { Button, Result } from 'antd';

interface FallbackProps {
	error?: Error;
	resetErrorBoundary?: (...args: Array<unknown>) => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<div role='alert' className='flex h-full items-center justify-center'>
			<Result
				className='w-full'
				status='500'
				title={<pre>{error?.message}</pre>}
				subTitle='Sorry, something went wrong.'
				extra={
					<Button type='primary' onClick={resetErrorBoundary}>
						Try again
					</Button>
				}
			/>
		</div>
	);
}
