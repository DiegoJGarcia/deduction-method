import React, { FC } from 'react';
import './Layout.scss';

interface LayoutProps {
	title?: string;
	children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ title, children }) => {
	return (
		<div className={`layout`}>
			{title && (
				<div className={`layout-head`}>
					<h1 className="bigtitles">{title}</h1>
				</div>
			)}
			<div className={`layout-main`}>{children}</div>
		</div>
	);
};

export default Layout;
