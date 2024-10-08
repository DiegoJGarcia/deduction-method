import React, { FC } from 'react';
import './Layout.scss';

interface LayoutProps {
	title?: string;
	action?: React.ReactNode;
	children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ title, action, children }) => {
	return (
		<div className={`layout`}>
			{title && (
				<div className={`layout-head`}>
					<h1 className="titles">{title}</h1>
					<div className="layout-head-actions">{action}</div>
				</div>
			)}
			<div className={`layout-main`}>{children}</div>
		</div>
	);
};

export default Layout;
